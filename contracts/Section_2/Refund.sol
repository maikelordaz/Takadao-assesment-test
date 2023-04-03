// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Refund {
    // The next to lines were added to compile the contract
    address[] refundAddresses;
    mapping(address => uint) refunds;

    function refundAll() public {
        for (uint x = 0; x < refundAddresses.length; x++) {
            require(payable(refundAddresses[x]).send(refunds[refundAddresses[x]]));
        }
    }
}
