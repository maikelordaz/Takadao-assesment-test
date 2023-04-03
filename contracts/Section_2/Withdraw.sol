// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Withdraw {
    // The next to lines were added to compile the contract
    uint etherLeft;
    mapping(address => uint) balances;

    function withdrawBalance(uint256 _amount) public {
        require(balances[msg.sender] >= _amount);
        balances[msg.sender] -= _amount;
        etherLeft -= _amount;
        // send is only available to payable addresses
        bool success = payable(msg.sender).send(_amount);
        require(success, "Something went wrong");
    }
}
