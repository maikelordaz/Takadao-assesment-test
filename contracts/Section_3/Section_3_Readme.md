# Section 3: Solidity Coding Tasks (10 pt)

This section consists of 1 question. Make sure to submit the solidity files with this document.
Make sure that the solidity contracts are compiled and runnable. Make sure to add the
appropriate comments to the file.

1. The following code snippet consists of a simple auction contract. The highest bidder
   becomes the new leader of the auction.

```javascript
contract Auction {
    address currentLeader;
    uint highestBid;

    function bid() external payable {
        require(msg.value > highestBid);
        require(payable(currentLeader).send(highestBid));

        currentLeader = msg.sender;
        highestBid = msg.value;
    }
}
```

-   Write a solidity smart contract that exploits this auction by preventing any new
    bidders from becoming the new leader of the auction. (5 pt)
-   Write down several unit tests (in javascript) to confirm that the attacker contract
    works correctly. (5 pt)
