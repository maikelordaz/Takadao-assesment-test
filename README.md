# Web3 smart contract developer assessment tests
This project is intended to be a part of a technical test. <br/>

+ [Walkthrough](#rocket-walkthrough)
+ [Assessment test](#books-questions-and-answers)
    + [Section 1: Long Answer Questions](#open_book-long-answer-questions)
        + [Question 1.1](#question-question-1-question)
            + [Answer 1.1](#dart-answer-1-dart)
        + [Question 1.2](#question-question-2-question)
            + [Answer 1.2](#dart-answer-2-dart)
        + [Question 1.3](#question-question-3-question)
            + [Answer 1.3](#dart-answer-3-dart)
        + [Question 1.4](#question-question-4-question)
            + [Answer 1.4](#dart-answer-4-dart)
    + [Section 2: Code Snippets](#open_book-code-snippets)
        + [Snippet 2.1](#question-code-snippet-1-question)
            + [Answer 2.1](#dart-snippet-1-answer-dart)
        + [Snippet 2.2](#question-code-snippet-2-question)
            + [Answer 2.2](#dart-snippet-2-answer-dart)
        + [Snippet 2.3](#question-code-snippet-3-question)
            + [Answer 2.3](#dart-snippet-3-answer-dart)
    + [Section 3: Solidity Coding Tasks](#open_book-solidity-coding-tasks)
        + [Problem code](#question-problem-code-question)
            + [Answer](#dart-answer-dart)
    + [Section 4: Web3 Dev Tasks](#open_book-web3-dev-tasks)
        + [Problem code](#question-web3-problem-question)
            + [Answer](#dart-web3-answer-dart)

## :rocket: Walkthrough 

1. Clone this repo.
3. Install the dependencies with  `yarn install.
4. Create an .env file with the next variables: 
    + DEPLOYER_PRIVATE_KEY=corresponding to your address private key.
    + MUMBAI_TESTNET_RPC_URL=Use your RPC provider of preference
    + POLYGONSCAN_API_KEY=to verify the contract if you deploy in some public net.
5. Read the answers for the test below and follow the instructions when it is needed

[top](#web3-smart-contract-developer-assessment-tests)

## :books: Questions and Answers 

The tasks in this document are divided into 4 sections. The first section consists of open-ended
questions. The second section consists of code snippets that require some type of analysis. The
third section consists of solidity coding tasks. The fourth section consists of web3 coding tasks.
Submit your solution via an open Github repository. Project must be cloned and executed with
no errors. You have 7 days to complete these tasks from the date of application.

[top](#web3-smart-contract-developer-assessment-tests)

### :open_book: Long Answer Questions

This section consists of 4 critical questions.

#### :question: Question 1 :question:

A client has approached you with a dApp idea that consists of a crowdfunding platform
on the blockchain. He’s been hearing a lot about new and innovative blockchain’s such
as Solana, Polkadot etc. He is unsure whether to deploy his idea on Ethereum or on one
of the other popular blockchains. Provide consultation to the client on how he should
approach this decision. You do not need to suggest a specific blockchain to the client,
but you are required to explain the factors that may influence his final decision. (5 pt)

[top](#web3-smart-contract-developer-assessment-tests)

#### :dart: Answer 1 :dart:

To assist the client I would try to list the things he has to be aware of, like:

1. Use case: the use case of his dApp idea it is important to select the blockchain, for example Polygon explain in his whitepaper the mos potential use cases for their network like payments, games, lending, credits, identity and more.
2. Comunity: Currently the most reliable projects use to be more decentralized, allowing users to have tokens and to be part of the decisions. The users tend to have public conversations and opinions on twitter, discord, reddit and telegram. May be a good idea to join the telegram group and the discord server to have a good lecture of the size of the comunity and to be sure if their opinions are taken in consideration.
3. Scalability and transaction speed: The blockchain to take has to be able to receive and process the queries of the current users and the future ones. It is important to check the long terms plans.
4. Consensus and governance: The blockchain is Proof of Work or Proof of Stake. The second one is the most scalable right now.
5. Team: If there is no way to know the team behind a blockchain and a project, it is time to turn on the alarms.
6. Roadmap: The short, mid and long terms objectives must be public and exhaustive, this means the team has spend time thinking on how to get better.
7. Longevity: How the project has aged? It had recurrent delays? Has accomplished the roadmap?
8. Development environment: The way to develop dApps on the blockchain is very important. Developers availables, frameworks, coding languages, etc. This can lead to troubles to build your developers team.

I´ll suggest to start with one EVM compatible blockchain, maybe a layer 2 with high scalability, speed and one big comunity like Polygon or Arbitrum. And for mid-term scale the project to other EVM compatibles chains

[top](#web3-smart-contract-developer-assessment-tests)

#### :question: Question 2 :question:

DAO’s are one of the common use cases on Ethereum. Currently, there are DAO’s for
charities and crowdfunding. The general idea is to reinforce transparency, reduce
transfer fees, and have collective votes for where the money should go. In your opinion,
what are the disadvantages of having such institutes as DAO’s on the blockchain?
Provide an example of a type organization that may not be suitable for DAO if
implementation if any (that is, an organization that deeply depends on a central authority
to function). (5 pt)
See: https://www.kickstarter.com/articles/the-future-of-crowdfunding-creative-projects

[top](#web3-smart-contract-developer-assessment-tests)

#### :dart: Answer 2 :dart:

The DAOs are more common as time passes, but regarding the numerous advatages they have, there are also some disadvatages. In my opinion the more important disadvantages are:

-   Security: It is important that the developers cover all the security basics, as the DAOs always have money on them, there always in risk of attack, and when this happen, the way the DAOs manage everything won´t allow to decide a way to manage attacks in a fast way.
-   Laws: As they run on blockchain,there has to be some laws that allow the DAOs to exist. But right now there are more news of countries trying to build walls to stop the inminent growth of blockchain.
-   People: Leave all decisions to people who hasn´t been prepared on economy, insurance, geopolitical, etc. it can bring the risk of bad decisions.

The way DAOs work, doesn´t leave room to highly hierarchical organizations, such as a Fire Department, health centers and similars, also payments dApps that have the responsability to pay salaries.

[top](#web3-smart-contract-developer-assessment-tests)

#### :question: Question 3 :question:

Describe the top 2 solidity security patterns that you personally think matters the most
when developing smart contracts. Describe what they are and what hacks they prevent.
Why did you select these 2 out of the rest? (5 pt)

[top](#web3-smart-contract-developer-assessment-tests)

#### :dart: Answer 3 :dart:

1. Secure Ether Transfers:

It is important to always secure and check every transfer, even though this feature is not the main application of Ethereum, it is still a necessary and highly used feature. I use this pattern when:

-   Transfer from a contract address to another address in a scure way
-   Not sure of which method use
-   Want to avoid any re-entrancy attacks

There are three methods

| Function   | Gas                           | Exception          | Units |
| ---------- | ----------------------------- | ------------------ | ----- |
| send       | 2300 (not adjustable)         | `false` on failure | wei   |
| call.value | all remaining gas(adjustable) | `false` on failure | wei   |
| transfer   | 2300(not adjustable)          | throws on failure  | wei   |

It is important to notice that `send` and `call.value` does not revert if fails so with them you will have to use a behavioral pattern `Guard Check Pattern` for example for `send` you can use

```javascript
require(<address>.send(amount))
```

And for `call.value`

```javascript
(bool success, ) = <address>.call{value: amount};
require(success, "Something went wrong");
```

This is equal to

```javascript
<address>.transfer(amount)
```

In most cases the must go should be `transfer` because it revert automatically. Use `send` when you need to handle the error without reverting all state changes. `call.value` should be the last resort, one good application for `call.value` is to send ethers to fallback and receive functions that needs more gas than usual

2. Check Effects Interactions

When calling an external address, the calling contract also transfers the control flow to the external entity, who is now can execute any inheritance code, in case it is another contract. In case when the external entity is a malicious contract can return an unexpected state to the initial contract. One of the most common attack vectors is a reentrancy attack, in which the malicious contract is reentering the initial contract before the external call is finished, this was part of the most prominent hack in Ethereum history the DAO exploit. This vulnerability can cost a lot of money for investors. This pattern combine with the one discused above provide a safe solution to re-entrancy attacks. I try to use this pattern when:

-   Can not avoid to hand over the control to an external entity
-   Want to guard your smart contract to re-entrancy attacks

To succesfully apply this pattern all internal state must be fully up to date before external interactions. This means that state variables should be updated before external calls, for example the balance of a user should be updated and then you make the transfer, if I already applied the Secure Ether Transfer explained above there is no problem with this, because if something fails everything will be reverted included the balances updates. This also give some design pattern to remember when writing smart contracts

My reason to select this two security patterns is that when they are applied together in a correct manner they help to avoid any exploits and vulnerabilities, also they make me to always write the same way this also reduce the errors when coding. It is necesary to always check if ether was send (or any token) and this two patterns ensure that

[top](#web3-smart-contract-developer-assessment-tests)

#### :question: Question 4 :question:

Describe a solidity behviour pattern that you always account for when developing your
smart contracts. Describe what it is, and what benefits it contributes to the code. (5 pt)

[top](#web3-smart-contract-developer-assessment-tests)

#### :dart: Answer 4 :dart:

-   Guard Check:

This pattern ensure the behavior and the inputs of an smart contract are as expected.
The desired behavior of a smart contract would be to check everithing before proceed with the logic, if not it reverts. It can be used to:

-   Validate user inputs
-   Check contract state before executing logic
-   Check invariants
-   Check return values
-   Rule out conditions that should not be possible

For this we have `require()`, `assert()` and `revert()`. One important diference is the opcodes used in them. The opcode for `require()` and `revert()` refund all the gas that has not been consumed while with `assert()`all the gas is used. The documentation recomends to us `require()` to ensure valid conditions, such as inputs, return values and state variables. `assert()` should be used to test for internal errors and `revert()` should be used in complex cases, e.g. when the condition can not be written in one line and we have to use if-else trees.

This pattern also increase the readability of the code, and even help to write good unit tests

[top](#web3-smart-contract-developer-assessment-tests)

### :open_book: Code Snippets

This section consists of 3 questions. For each question, make sure to apply the fixes (if any) in a solidity file.

#### :question: Code snippet 1 :question:

List any possible vulnerabilities in the following code and suggest clear fixes to the vulnerabilities. If no vulnerabilities exist, explain why the code is invulnerable. (5 pt)

```javascript
function withdrawBalance(uint256 _amount) public {
    require(balances[msg.sender] >= _amount);
    balances[msg.sender] -= _amount;
    etherLeft -= _amount;
    msg.sender.send(_amount);
}
```

[top](#web3-smart-contract-developer-assessment-tests)

#### :dart: Snippet 1 Answer :dart:

Check the solidity file [here](./contracts/Section_2/Withdraw.sol)

-   Findings:
    1. "Critical" The contract has errors. "send" is only available to payable addresses
        - Solution: Rewrite as suggested
    2. "Critical" It does not check the return value for "send". It is recomnded to always check if any transaction is completed
        - Solution: Check for the return value. For "send" is a boolean. True if succed, false if not

Suggested code:

```javascript
   function withdrawBalance(uint256 _amount) public {
        require(balances[msg.sender] >= _amount);
        balances[msg.sender] -= _amount;
        etherLeft -= _amount;
        bool success = payable(msg.sender).send(_amount);
        require(success, "Something went wrong");
    }
```

Note: Some lines where added to complete a minimalistic contract

[top](#web3-smart-contract-developer-assessment-tests)

#### :question: Code snippet 2 :question:

List any possible vulnerabilities in the following code and suggest clear fixes to the vulnerabilities.
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

[top](#web3-smart-contract-developer-assessment-tests)

#### :dart: Snippet 2 Answer :dart:

Check the solidity file [here](./contracts/Section_2/Bank.sol)

-   Findings:
    1. "Critical" In the function withdrawBalance() a state variable is written after a call. In this case the mapping userBalance. This can lead to reentrancy attacks.
        - Solution: move that line of code before the call.

Suggested code:

```javascript
contract Bank {
    mapping(address => uint) userBalance;

    function getBalance(address u) public view returns (uint) {
        return userBalance[u];
    }

    function addToBalance() external payable {
        userBalance[msg.sender] += msg.value;
    }

    function withdrawBalance() external {
        uint amountToWithdraw = userBalance[msg.sender];
        userBalance[msg.sender] = 0;
        (bool success, ) = msg.sender.call{value: amountToWithdraw}("");
        if (!success) {
            revert();
        }
    }
}
```

[top](#web3-smart-contract-developer-assessment-tests)

#### :question: Code snippet 3 :question:

List any possible vulnerabilities in the following code and suggest clear fixes to the vulnerabilities.
If no vulnerabilities exist, explain why the code is invulnerable. (5pt)

```javascript
   function refundAll() public {
      for(uint x; x < refundAddress.length; x++) {
         require(payable(refundAddresses[x]).send(refunds[refundAddresses[x]]));
      }
   }
```

[top](#web3-smart-contract-developer-assessment-tests)

#### :dart: Snippet 3 Answer :dart:

Check the solidity file [here](./contracts/Section_2/Refund.sol)

-   Findings:
    1. "Medium" In the for loop the local variable "X" it is not initialized
        - Solution: initialize the variable

Suggested code:

```javascript
  function refundAll() public {
        for (uint x = 0; x < refundAddresses.length; x++) {
            require(payable(refundAddresses[x]).send(refunds[refundAddresses[x]]));
        }
    }
```
Note: Some lines where added to complete a minimalistic contract

[top](#web3-smart-contract-developer-assessment-tests)

### :open_book: Solidity Coding Tasks

This section consists of 1 question. Make sure to submit the solidity files with this document.
Make sure that the solidity contracts are compiled and runnable. Make sure to add the
appropriate comments to the file.

#### :question: Problem code :question:

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

[top](#web3-smart-contract-developer-assessment-tests)

#### :dart: Answer :dart:

The solidity smart contract that exploit and hack the Auction contract is in [this file](./contracts/Section_3/Auction.sol)

In the same file is the Auction contract (this is the problem to solve) and the HackAuction contract (this is the answer). There are some comments to explain both contracts. You can compile with

> yarn compile

The unit tests for the hack are in [this file](./test/section3/HackAuction.test.js)

The tests also have comments to explain. To run them use

> yarn test

There was the need to write some deploy scripts. Check them [here](./deploy/03-section-3.js/01-deploy-auction.js) and [here](./deploy/03-section-3.js/02-deploy-hack-auction.js)

[top](#web3-smart-contract-developer-assessment-tests)

### :open_book: Web3 Dev Tasks

#### :question: Web3 problem :question:

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

[top](#web3-smart-contract-developer-assessment-tests)

#### :dart: Web3 Answer :dart:

[top](#web3-smart-contract-developer-assessment-tests)
