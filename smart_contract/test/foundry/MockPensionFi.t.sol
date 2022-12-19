// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import "../contracts/mocks/MockPensionFi.sol";

contract PensionFiTest is Test {
    MockPensionFi public pensionFi;

    address owner = address(0x1234);
    address userOne = address(0x1122);
    address userTwo = address(0x1123);
    address deployer;

    //Setup Function
    //Owner deployed the contract
    function setUp() public {
        vm.startPrank(owner);
        pensionFi = new MockPensionFi();
        deployer = owner;
        vm.stopPrank();
    }

    //Deployer is the owner (TEST-1)
    function testOwner() public {
        assertEq(deployer, address(0x1234));
    }

    //Current Position Id is 0 when contract is deployed (TEST-2)
    function testCurrentPositionId() public {
        assertEq(pensionFi.currentPositionId(), 0);
    }

    //Tiers have been updated when contract is deployed (TEST-3)
    function testTiers() public {
        assertEq(pensionFi.tiers(30), 700);
    }

    //LockPeriods array has been populated when contract is deployed (TEST-4)
    function testLockPeriods() public {
        assertEq(uint(pensionFi.getLockPeriods().length), 3);
    }

    //Test if the stakerEther function works correctly (TEST-5)
    function testStakeEther() public {
        uint initialContractBalance = address(pensionFi).balance;

        vm.startPrank(userOne);
        vm.deal(userOne, 1 ether);

        pensionFi.stakeEther{value: 0.5 ether}(30);

        uint currentContractBalance = address(pensionFi).balance;

        //positionId will be 0 for the first position because currentPositionId gets updated after position gets updated
        assertEq(pensionFi.getPositionById(0).positionId, 0);
        //The array mapping should have an entry for the staked position
        assertEq(pensionFi.getAllPositionIdsByAddress(userOne).length, 1);
        //Contract balance should increase by the amount user has staked
        assertEq(currentContractBalance, initialContractBalance + 0.5 ether);

        vm.stopPrank();
    }

    //Test if the calculateInterest function calculates the interest correctly (TEST-6)
    function testCalculateInterest() public {
        uint calculated = pensionFi.calculateInterest(700, 30, 1000000000000000000);
        assertEq(calculated, 70000000000000000);
    }

    //Test if the owner can change unlock date correctly (TEST-7)
    function testChangeUnlockDate() public {
        vm.startPrank(owner);
        pensionFi.changeUnlockDate(1, 1663437715);
        assertEq(pensionFi.getPositionById(1).unlockDate, 1663437715);
        vm.stopPrank();
    }

    //Test if the user gets 0 interest if he closes position before the unlock date (TEST-8)
    function testCloseBeforeUnlock() public {

        vm.startPrank(userOne);

        vm.deal(userOne, 1 ether);

        pensionFi.stakeEther{value: 0.5 ether}(30);

        assertEq(pensionFi.getPositionById(0).weiStaked, 500000000000000000);

        assertEq(address(userOne).balance, 0.5 ether);

        uint balanceBefore = address(userOne).balance;

        pensionFi.closePosition(0);

        uint balanceAfter = address(userOne).balance;

        assertEq(balanceAfter, pensionFi.getPositionById(0).weiStaked + balanceBefore);
        vm.stopPrank();
    }

    //Test if the user earns the right amount of interest if he closes position after the unlock date (TEST-9)
    function testCloseAfterUnlock() public {
        //First stake the amount from userOne
        vm.startPrank(userOne);
        vm.deal(userOne, 1 ether);
        pensionFi.stakeEther{value: 0.5 ether}(30);
        assertEq(pensionFi.getPositionById(0).weiStaked, 500000000000000000);
        assertEq(address(userOne).balance, 0.5 ether);
        vm.stopPrank();

        //Fund the contract with some Ethers otherwise it won't be able to pay Interest
        vm.deal(address(pensionFi), 20 ether);
        assertGt(address(pensionFi).balance, 19 ether);

        //Then fund the contract and change the unlock date of the created position to a previous date
        vm.startPrank(owner);
        //Set the unlockDate timestamp to Zero otherwise block.timeStamp will not be greater than unlockDate
        pensionFi.changeUnlockDate(0, 0);
        assertEq(pensionFi.getPositionById(0).unlockDate, 0);
        vm.stopPrank();

        //The close the position from userOne and check if the user earns the interest after closing

        vm.startPrank(userOne);
        uint balanceBefore = address(userOne).balance;
        pensionFi.closePosition(0);
        uint balanceAfter = address(userOne).balance;

        assertGt(block.timestamp, pensionFi.getPositionById(0).unlockDate);
        assertEq(balanceAfter, pensionFi.getPositionById(0).weiStaked + balanceBefore + pensionFi.getPositionById(0).weiInterest);
        vm.stopPrank();
    }

    //Test if the stakeEther function fails for non-existing Tier
    function testFailNonExistingTier() public {
        vm.startPrank(userOne);
        vm.deal(userOne, 1 ether);

        pensionFi.stakeEther{value: 0.5 ether}(50);
        vm.expectRevert(bytes("Mapping not found"));
        vm.stopPrank();
    }

    //Test if non-owner is unsuccessful to change the lock periods
    function testFailLockPeriods() public {
        vm.startPrank(userOne);
        pensionFi.changeLockPeriods(50, 800);
        vm.expectRevert(bytes("Only owner can modify the staking periods"));
        vm.stopPrank();
    }

    //Test if non-owner is unsuccesful to change the unlock date
    function testFailUnlockDate() public {
        vm.startPrank(userOne);
        pensionFi.changeUnlockDate(0, 213424234);
        vm.expectRevert(bytes("Only owner can change Unlock date"));
        vm.stopPrank();
    }

    //Test if Another user fails to close the position that someone else created
    function testFailClosePositionDifferentUser() public {
        //Create a staking position with userOne
        vm.startPrank(userOne);
        vm.deal(userOne, 1 ether);

        pensionFi.stakeEther{value: 0.5 ether}(30);
        vm.stopPrank();

        //Try to close the position with userTwo
        vm.startPrank(userTwo);
        vm.deal(userOne, 1 ether);
        pensionFi.closePosition(0);
        vm.expectRevert(bytes("Only the creator can modify the position"));
        vm.stopPrank();
    }

}