// SPDX-License-Identifier: GPL-3.0

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
pragma solidity >=0.8.2 <0.9.0;

contract SendToken is ERC20("Voters Token", "VT") {

    function sendIt() public {
        _mint(msg.sender, 1*10**18);
    }

}


