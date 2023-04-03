# Web3_smart contract developer assessment tests

The tasks in this document are divided into 4 sections. The first section consists of open-ended
questions. The second section consists of code snippets that require some type of analysis. The
third section consists of solidity coding tasks. The fourth section consists of web3 coding tasks.
Submit your solution via an open Github repository. Project must be cloned and executed with
no errors. You have 7 days to complete these tasks from the date of application.

## Section 1: Long Answer Questions (20 pt)

This section consists of 4 critical questions.

1. A client has approached you with a dApp idea that consists of a crowdfunding platform
   on the blockchain. He’s been hearing a lot about new and innovative blockchain’s such
   as Solona, Polkadot etc. He is unsure whether to deploy his idea on Ethereum or on one
   of the other popular blockchains. Provide consultation to the client on how he should
   approach this decision. You do not need to suggest a specific blockchain to the client,
   but you are required to explain the factors that may influence his final decision. (5 pt)
2. DAO’s are one of the common use cases on Ethereum. Currently, there are DAO’s for
   charities and crowdfunding. The general idea is to reinforce transparency, reduce
   transfer fees, and have collective votes for where the money should go. In your opinion,
   what are the disadvantages of having such institutes as DAO’s on the blockchain?
   Provide an example of a type organization that may not be suitable for DAO if
   implementation if any (that is, an organization that deeply depends on a central authority
   to function). (5 pt)
   See: https://www.kickstarter.com/articles/the-future-of-crowdfunding-creative-projects
3. Describe the top 2 solidity security patterns that you personally think matters the most
   when developing smart contracts. Describe what they are and what hacks they prevent.
   Why did you select these 2 out of the rest? (5 pt)
4. Describe a solidity behviour pattern that you always account for when developing your
   smart contracts. Describe what it is, and what benefits it contributes to the code. (5 pt)

## Section 2: Code Snippets (15 pt)

This section consists of 3 questions. For each question, make sure to apply the fixes (if any)
in a solidity file.

1. List any possible vulnerabilities in the following code and suggest clear fixes to the vulnerabilities. If no vulnerabilities exist, explain why the code is invulnerable. (5 pt)

```javascript
function withdrawBalance(uint256 _amount) public {
    require(balances[msg.sender] >= _amount);
    balances[msg.sender] -= _amount;
    etherLeft -= _amount;
    msg.sender.send(_amount);
}
```

2. List any possible vulnerabilities in the following code and suggest clear fixes to the vulnerabilities.
   If no vulnerabilities exist, explain why the code is invulnerable. (5 pt)

```javascript
contract Bank {
   mapping (address => uint) userBalance;

   function getBalance(address u) public view returns(uint){
      return userBalance[u];
   }

   function addToBalance() external payable{
      userBalance[msg.sender] += msg.value;
   }

   function withdrawBalance() external{
      uint amountToWithdraw = userBalance[msg.sender];
      (bool success, ) = msg.sender.call{value:amountToWithdraw}("");
      if( ! success ){
         revert();
      }
      userBalance[msg.sender] = 0;
   }
}
```

3. List any possible vulnerabilities in the following code and suggest clear fixes to the vulnerabilities.
   If no vulnerabilities exist, explain why the code is invulnerable. (5pt)

```javascript
   function refundAll() public {
      for(uint x; x < refundAddress.length; x++) {
         require(payable(refundAddresses[x]).send(refunds[refundAddresses[x]]));
      }
   }
```

## Section 3: Solidity Coding Tasks (10 pt)

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

## Section 4 : Web3 Dev Tasks (10 pt)

Create a Single-Page-Application that displays a single table of all the account holders of the
USDC stable coin on the Etherem blockchain. USDC is an ERC-20 contract with address:
https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
For this task, you can use any type and kind of DB you wish. You can use any web3 tools and
libraries at your disposal. Be it web3.js, ethers.js, webhooks, Alchemy etc..
You are required to:

1. Get past event logs of the Transfer() event emitted on the blockchain to collect historical
   information, and maintain them in a DB. For simplicity, only collect historical
   information from the date: 1st March 2023.
2. Subscribe to new events to append to the new DB whenever a transfer takes place.
3. Display a table with the columns “Address” and “Balance” based on the info collected.
   Note: Maintaining info in a DB is optional. You can directly display historical + new events but
   this is not an optimal solution.
   Marks will be rewarded on:
4. Creativity of solution and tools used
5. General architecture
6. Cleanliness of code
