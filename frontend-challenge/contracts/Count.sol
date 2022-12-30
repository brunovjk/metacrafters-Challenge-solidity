//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract Count {
    uint256 public count;

    event IncCount();
    event DecCount();
    event ClearCount();

    function incCount() public {
        count += 1;
        emit IncCount();
    }

    function decCount() public {
        count -= 1;
        emit DecCount();
    }

    function clearCount() public {
        count = 0;
        emit ClearCount();
    }
}
