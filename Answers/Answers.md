# Answers

## Section 2: Code Snippets

1. The answer to this code is written on

> contracts/Section_2/Withdraw.sol

There you can check the changes sugested and read some comments.

-   Findings:
    1. "Critical" The contract has errors. "send" is only available to payable addresses
    2. "Critical" It does not check the return value for "send"
-   Solution:

    1. Rewrite as suggested
    2. Check for the return value. For "send" is a boolean. True if succed, false if not

-   Note: Some lines were added to have a minimalistic contract

2. The answer to this code is written on

> contracts/Section_2/Bank.sol

There you can check the changes sugested and read some comments.

-   Findings: "Critical" In the function withdrawBalance() a state variable is written
    after a call. In this case the mapping userBalance.
-   Solution: move that line of code before the call.
-   Note: Be aware that if the call is not successfull you have to return the balance

3. The answer to this code is written on

> contracts/Section_2/Refund.sol

There you can check the changes sugested and read some comments.

-   Findings: "Medium" In the for loop the local variable "X" it is not initialized
-   Solution: initialize the variable
-   Note: Some lines were added to have a minimalistic contract

## Section 3: Solidity Coding Tasks

The solidity smart contract that exploit and hack the Auction contract is in the folder

> contracts/Section_3/Auction.sol

In the same file is the Auction contract (this is the problem to solve) and the HackAuction contract (this is the answer). There are some comments to explain both contracts. You can compile with

> yarn compile

The unit tests for the hack are in

> test/section3/HackAuction.test.js

The tests also have comments to explain. To run them use

> yarn test

There was the need to write some deploy scripts. Check them on

> deploy/03-section.js/01-deploy-auction.js
> deploy/03-section.js/02-deploy-hack-auction.js
