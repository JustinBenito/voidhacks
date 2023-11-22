// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Voteit {

    struct Voter {
        bool hasVoted;
    }

    mapping(address => Voter) public voters;
    uint public totalVotes;
    uint public nota;

    address public admin;

    enum State { Created, Voting, Ended }
    State public state;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    modifier inState(State _state) {
        require(state == _state, "Invalid state for this operation");
        _;
    }

    constructor() {
        admin = msg.sender;
        state = State.Created;
    }

    function startVoting() external onlyAdmin inState(State.Created) {
        state = State.Voting;
    }

    function vote(bool _choice) external inState(State.Voting) returns (bool) {
        require(!voters[msg.sender].hasVoted, "You have already voted");
        
        voters[msg.sender].hasVoted = true;
        totalVotes++;

        if (_choice) {
            nota++;
        }

        return true;
    }

    function endVoting() external onlyAdmin inState(State.Voting) {
        state = State.Ended;
    }
}
