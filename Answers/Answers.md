# Answers

## Section 1: Long answers questions

### Question 1: Blockhain selection

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

### Question 2: DAO

The DAOs are more common as time passes, but regarding the numerous advatages they have, there are also some disadvatages. In my opinion the more important disadvantages are:

-   Security: It is important that the developers cover all the security basics, as the DAOs always have money on them, there always in risk of attack, and when this happen, the way the DAOs manage everything won´t allow to decide a way to manage attacks in a fast way.
-   Laws: As they run on blockchain,there has to be some laws that allow the DAOs to exist. But right now there are more news of countries trying to build walls to stop the inminent growth of blockchain.
-   People: Leave all decisions to people who hasn´t been prepared on economy, insurance, geopolitical, etc. it can bring the risk of bad decisions.

The way DAOs work, doesn´t leave room to highly hierarchical organizations, such as a Fire Department, health centers and similars, also payments dApps that have the responsability to pay salaries.

### Question 3: Security patterns

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

When calling an external address, the calling contract also transfers the control flow to the external entity, who is now can execute any inheritance code, in case it is another contract. In case when the external entity is a malicious contract can return an unexpected state to the initial contract. One of the most common attack vectors is a reentrancy attack, in which the malicious contract is reentering the initial contract before the external call is finished, this was part of the most prominent hack in Ethereum history the DAO exploit. This vulnerability is not present in other software enviroments, making it hard to avoid for developers not familiarized with smart contract development. This pattern combine with the one discused above provide a safe solution to re-entrancy attacks. Use this pattern when:

-   Can not avoid to hand over the control to an external entity
-   Want to guard your smart contract to re-entrancy attacks

To succesfully apply this pattern all internal state must be fully up to date before external interactions. This means that state variables should be updated before external calls, for example the balance of a user should be updated and then you make the transfer, if you apply the Secure Ether Transfer explained above there is no problem with this, because if something fails everything will be reverted included the balances updates.

### Question 4: Solidity behaviour pattern

-   Guard Check:

This pattern ensure the behavior and the inputs of an smart contract are as expected.
The desired behavior of a smart contract would be to check everithing before proceed with the logic, if not it reverts. It can be used to:

-   Validate user inputs
-   Check contract state before executing logic
-   Check invariants
-   Check return values
-   Rule out conditions that should not be possible

For this we have `require()`, `assert()` and `revert()`. One important diference is the opcodes used in them. The opcode for `require()` and `revert()` refund all the gas that has not been consumed while with `assert()`all the gas is used. The documentation recomends to us `require()` to ensure valid conditions, such as inputs, return values and state variables. `assert()` should be used to test for internal errors and `revert()` should be used in complex cases, e.g. when the condition can not be written in one line and we have to use if-else trees.

This pattern also increase the readability of the code.

## Section 2: Code Snippets

### Code snippet 1

1. The original code is:

```javascript
function withdrawBalance(uint256 _amount) public {
    require(balances[msg.sender] >= _amount);
    balances[msg.sender] -= _amount;
    etherLeft -= _amount;
    msg.sender.send(_amount);
}
```

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

### Code snippet 2

2. The original code is:

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
        // The next line was moved to the top
        //userBalance[msg.sender] = 0;
    }
}
```

### Code snippet 3

3. The original code is:

```javascript
   function refundAll() public {
      for(uint x; x < refundAddress.length; x++) {
         require(payable(refundAddresses[x]).send(refunds[refundAddresses[x]]));
      }
   }
```

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

## Section 4 : Web3 Dev Tasks
