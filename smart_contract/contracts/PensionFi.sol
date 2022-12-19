// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "./interfaces/ILendingPool.sol";
import "./interfaces/IWETHGateway.sol";

/// @title PensionFi - DeFi ETH Staking Dapp
/// @author @holyaustin
/// @notice This contract is for creating a DeFi ETH staking dapp to generate passive income yield on your ETH deposited as Pension
/// @dev This contract implements three different staking periods with three different APY percentages
/// @dev This contract integrates with Aave to lend for passive income yield on the stored funnds in the contract
/// @dev The contract implements WETH Gateway to convert ETH to WETH and deposit to Aave lending pool and Vice versa
/// @dev Here is the URL for the WETH Gateway: https://docs.aave.com/developers/v/2.0/the-core-protocol/weth-gateway 

contract PensionFi {

    //IWETHGateway interface for the Mumbai testnet
    IWETHGateway public iWethGateway = IWETHGateway(0x87770f04Bbece8092d777860907798138825f303);

    //ILendingPool interface
    //Pool-Proxy-Fantom - 0x771A45a19cE333a19356694C5fc80c76fe9bc741
    ILendingPool public iLendingPool = ILendingPool(0x771A45a19cE333a19356694C5fc80c76fe9bc741);

    //Lending Pool / PoolAddressesProvider-Aave address for the Aave (v3) lending pool on  testnet
    // PoolAddressesProvider-Fantom -0xE339D30cBa24C70dCCb82B234589E3C83249e658
    address public constant lendingPoolAddress = (0x771A45a19cE333a19356694C5fc80c76fe9bc741);

    //Contract Address for the amWeth tokens generated after depositing ETH to keep track of the amount deposited in lending pool
    //0xfB6A6A48e81F8E0a0cC35cca4ea1946869Cc5F00 weth next is wftm
    //0xF7475b635EbE06d9C5178CC40D50856Fa98C7332
    address public constant aWethAddress = (0xF7475b635EbE06d9C5178CC40D50856Fa98C7332);

    address public owner;

    //Position is created after the user deposits their ETH to the contract
    //The position contains the following information: positionId, walletAddress, createdDate, unlockDate, percentInterest, weiStaked, weiInterest, status of position
    struct Position {
        uint positionId;
        address walletAddress; //That created the position
        uint createdDate;
        uint unlockDate; //When funds can be withdrawn without penalty
        uint percentInterest;
        uint weiStaked;
        uint weiInterest; //Interest that the user will earn
        bool open;
    }

    //Instance of the Position struct
    Position private position;

    //It will increment after each new position is created
    uint256 public currentPositionId;

    //Every newly created position will be added to this mapping
    mapping (uint => Position) public positions;

    //For user to query all the positions that he has created
    mapping (address => uint[]) public positionIdsByAddress;
    
    //Data for number of days and interest rates
    mapping (uint => uint) public tiers;

    //Array that contains integers for lock periods (30 days, 90 days, 365 days)
    uint256[] public lockPeriods;

    //Payable to allow the deployer of the contract to send Ether to it when its being deployed
    constructor() payable {
        owner = msg.sender;
        currentPositionId = 0;

        tiers[365] = 1200; //1200 basis points which is 7% APY
        tiers[730] = 2500; //25% APY
        tiers[1825] = 7500; //75% APY

        lockPeriods.push(365);
        lockPeriods.push(730);
        lockPeriods.push(1825);
    }

    /// @notice stakeEther function allows user to deposit ETH funds to the PensionFi contract
    /// @notice Once the user deposits ETH, a position is created
    /// @notice positionId is pushed to the positionIdsByAddress mapping to keep track of all position of a user
    /// @dev the iWethGateway interface then take funds from the contract and deposits them to the Aave lending pool
    /// @dev amWeth tokens are generated and balance of contract is updated (amWeth tokens) to keep track of the amount lended to the lendingPool and interest generated
    function stakeEther(uint numDays) external payable {
        //To make sure that the number of Days belong to one of the tiers
        require(tiers[numDays] > 0, "Mapping not found");

        positions[currentPositionId] = Position(
            currentPositionId,
            msg.sender,
            block.timestamp, //creation date
            block.timestamp + (numDays * 1 days), //unlock date
            tiers[numDays], //interest rate
            msg.value, //Ether to be staked
            calculateInterest(tiers[numDays], numDays, msg.value), //function to calculate the interest
            true //position status is set to open until user closes it
        );

        //To get the Ids of the positions a user owns
        positionIdsByAddress[msg.sender].push(currentPositionId);
        currentPositionId += 1;

        //Deposit ETH via WETHGateway
        //It will convert ETH to WETH and also send funds to the lending pool
        iWethGateway.depositETH{value: msg.value}(lendingPoolAddress, address(this), 0);
    }

    /// @notice This function calculates the interest based on the amountstaked and APY percentage
    function calculateInterest(uint basisPoints, uint numDays, uint weiAmount) public pure returns (uint) {
        return basisPoints * weiAmount / 10000;
    }
    
    /// @notice This function allows the owner of the contract to change LockPeriods in the future
    /// @dev The function will only work if called by the contract owner
    function changeLockPeriods(uint numDays, uint basisPoints) external {
        require(owner == msg.sender, "Only owner can modify the staking periods");

        tiers[numDays] = basisPoints;
        lockPeriods.push(numDays);
    }

    /// @notice Owner can change unlock date for a specific position
    function changeUnlockDate(uint positionId, uint newUnlockDate) external {
        require(owner == msg.sender, "Only owner can change Unlock date");

        positions[positionId].unlockDate = newUnlockDate;
    }

    /// @notice This function allows the user to un-stake their funds and also receive any earned interest
    /// @notice The function can only be called by the user who has created that specific position
    /// @notice If the user un-stakes before the unlockDate, they won't earn any interest
    /// @dev First the WETH will be converted back to ETH and lending pool will send back the Ether to the contract
    /// @dev The iWethGateway needs approval to burn the respective amWeth so that lending pool can send the ETH to contract
    /// @notice The user then receives their ETH bqck along with any earned interest
    function closePosition(uint positionId) external {
        require(positions[positionId].walletAddress == msg.sender, "Only the creator can modify the position");
        require(positions[positionId].open == true, "Position is closed");

        positions[positionId].open = false;

        //Withdraw lended funds via the Weth Gateway
        //It will convert back the WETH to ETH and send it to the contract
        //Ensure you set the relevant ERC20 allowance of amWeth, before calling this function, so the WETHGateway contract can burn the associated amWeth
        IERC20(aWethAddress).approve(address(iWethGateway), type(uint256).max);
        iWethGateway.withdrawETH(lendingPoolAddress, positions[positionId].weiStaked, address(this));

        //If the user is un-staking before the Unlock period, they won't gain any interest
        if(block.timestamp > positions[positionId].unlockDate) {
            uint amount = positions[positionId].weiStaked + positions[positionId].weiInterest;
            (bool success, ) = payable(msg.sender).call{value: amount}("");
            require(success, "Transaction failed");
        } else {
            (bool success, ) = payable(msg.sender).call{value: positions[positionId].weiStaked}("");
            require(success, "Transaction failed");
        }

    }

    /* Getter Functions */

    function getLockPeriods() external view returns(uint[] memory) {
        return lockPeriods;
    }

    function getInterestRates(uint numDays) external view returns(uint) {
        return tiers[numDays];
    }

    function getPositionById(uint positionId) external view returns(Position memory) {
        return positions[positionId];
    }

    function getAllPositionIdsByAddress(address walletAddress) external view returns(uint[] memory) {
        return positionIdsByAddress[walletAddress];
    }

    function getWeiFromPosition(uint positionId) external view returns(uint) {
        return positions[positionId].weiStaked;
    }

    function getContractAWETHBalance() external view returns(uint) {
        return IERC20(aWethAddress).balanceOf(address(this));
    }

    //Receive function is needed because withdrawETH is sending funds to the contract
    receive() external payable {
    }

    
}