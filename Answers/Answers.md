# Answers

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
-   Note: Be aware that if the call is not successfull you have to return the balance

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
