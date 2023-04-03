# Answers

## Section 1: Long answers questions

### Question 3: Security patterns

1. Secure Ether Transfers:

It is important to always secure and check every transfer, even though this feature is not the main application of Ethereum, it is still a necessary and highly used feature. It is important to use this pattern when:

-   Transfer from a contract address to another address in a scure way
-   Not sure of which method use
-   Want to avoid any re-entrancy attacks

You have the next three methods

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
