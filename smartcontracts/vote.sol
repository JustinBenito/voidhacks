// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract VotingContract {

    address public owner;
    address public voteTokenAddress;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor(address _voteTokenAddress) {
        owner = msg.sender;
        voteTokenAddress = _voteTokenAddress;
    }

    function vote() external payable {
        // Ensure that the sender has 1 Vote Token
require(IERC20(voteTokenAddress).balanceOf(msg.sender) >= 1, string(abi.encodePacked("Insufficient Vote Tokens. Balance: ")));


        // Transfer 1 Vote Token back to the owner
        IERC20(voteTokenAddress).transferFrom(msg.sender, owner, 1);

        // Perform the voting logic here...
        // You can add your specific voting logic or emit an event to signify the vote.
    }

    // Additional functions can be added as needed...

}
