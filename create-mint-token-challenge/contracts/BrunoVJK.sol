// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @custom:security-contact brunovjk@gmail.com
contract BrunoVJK is ERC20, Ownable {
    constructor() ERC20("BrunoVJK", "VJK") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}