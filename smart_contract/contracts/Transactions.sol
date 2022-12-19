// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "../node_modules/hardhat/console.sol";

contract Transactions {
    uint256 transactionCount;
    address owner;

    modifier onlyOwner {
       require(msg.sender == owner);
      _;
   }
   constructor() {
      owner = msg.sender;
   }
    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp);
  
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
    }

    TransferStruct[] transactions;

    function addToBlockchain(uint amount, string memory message) public {
        transactionCount += 1;
        transactions.push(TransferStruct(msg.sender, address(this), amount, message, block.timestamp));

        emit Transfer(msg.sender, address(this), amount, message, block.timestamp);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
    function withdraw() public payable onlyOwner {
    (bool success, ) = payable(msg.sender).call{
    value: address(this).balance
    }('');
    require(success);
    // payable(msg.sender).transfer(address(this).balance);

}
}