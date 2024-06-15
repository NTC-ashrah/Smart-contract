// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    uint256 public balance;
    uint256 public tokenBalance;
    
    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns(uint256){
        return balance;
    }   

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;

        // validate sender
        require(msg.sender == owner, "You are not the owner of this account");

        // execute transaction
        balance += _amount;

        // assert transaction integrity
        assert(balance == _previousBalance + _amount);

        // emit event
        emit Deposit(_amount);
    }

    // custom error
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        // execute withdrawal
        balance -= _withdrawAmount;

        // assert balance integrity
        assert(balance == (_previousBalance - _withdrawAmount));

        // emit event
        emit Withdraw(_withdrawAmount);
    }

    function convertToToken(uint256 _amount) public {

        require(balance >= _amount, "You don't have enough balance.");

        tokenBalance = _amount;
        balance -= _amount;
        
    }

    function getTokens() public view returns (uint256) {

        return tokenBalance;
        
    }

}
