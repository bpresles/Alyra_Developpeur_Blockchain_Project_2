# Voting

## Table of Contents
- [Presentation](#presentation)
- [Structure](#structure)
- [Installation](#installation)
- [Commands](#commands)
- [Tests structure](#tests-structure)
- [Tests results](#tests-results)
- [Gas consumption](#gas-consumption)
- [Coverage](#coverage)

<a name="presentation"></a>
## Presentation
The voting smart contract is a simple voting system for small organizations that allows to register voters, let them make proposals, vote for one proposal and then obtain the winning proposal in a simple majority manner.

<a name="structure"></a>
## Structure
The project contains the following main folders:

- contracts (Solidity source file of the smart contract)
- scripts (Deployment script)
- test (Unit tests)
- coverage (Coverage of tests reports)

<a name="installation"></a>
## Installation
To run the tests, you'll need to execute the following commands to install the required dependencies:

```bash
$ git clone https://github.com/bpresles/Alyra_Developpeur_Blockchain_Project_2.git
$ npm install (ou yarn install)
```

<a name="commands"></a>
## Commands
<br/>

### Compile smart contrat
```bash
npx hardhat compile 
```

### Deploy smart contrat
```bash
npx hardhat (--network [network_name]) run scripts/1_deploy.js
```

### Run tests without coverage
```bash
npx hardhat test
```

### Run tests with coverage
```bash
npx hardhat coverage
```

<a name="tests-structure"></a>
## Tests
The tests are covering all the functions of the Voting contract by use case categories:

- Voters management
- Proposals
- Voting session
- Tally votes

In each category, the tests are covering the following elements:

- Requirements
- Events
- Nominal scenarios
- Limit scenarios

<a name="tests-results"></a>
### Tests results 

```bash
  Voting
    Voters registration
      addVoter
        ✓ Require - Should not allow adding voter if not owner
        ✓ Require - Should not allow registering existing voter
        ✓ Require - Should not allow registering voter if workflow status is not RegisteringVoters
        ✓ Event - Should allow adding not registered voter by owner
    Proposals
      getOneProposal
        ✓ Require - Should not allow to get one proposal information when caller is not voter
        ✓ getVoter - Should return the proposal information when called by a voter
      addProposal/getOneProposal
        ✓ Require - addProposal - Should not allow to add proposal to not registered voters
        ✓ Require - addProposal - Should not allow adding proposal if workflow status is not ProposalsRegistrationStarted
        ✓ Require - addProposal - Should not allow empty proposal
        ✓ Event - addProposal - Should emit ProposalRegistered on successful proposal
        ✓ addProposal - Should add proposal when the caller is a registered voter
        ✓ getOneProposal - Should revert on overflow argument value
      Workflow startProposalsRegistering/endProposalsRegistering
        ✓ Require - startProposalsRegistering - Should revert when called from not owner
        ✓ Require - startProposalsRegistering - Should emit WorkflowStatusChange with status 1
        ✓ Require - startProposalsRegistering - Should not allow starting proposal registering when not in correct state
        ✓ Require - endProposalsRegistering - Should revert when called from not owner
        ✓ Require - endProposalsRegistering - Should not allow ending proposal registering when not started yet
        ✓ Event - endProposalsRegistering - Should emit WorkflowStatusChange with status change from 1 to 2
    Votes
      getVoter
        ✓ Require - Should not allow to get voter information when caller is not voter
        ✓ getVoter - Should return the voter information when called by a voter
      setVote
        ✓ Require - Should not allow to vote when caller is not voter
        ✓ Require - Should not allow to vote voting session has not started
        ✓ Require - Should not allow to vote twice
        ✓ Require - Should not allow vote on nonexisting proposal
        ✓ Vote & Event - Should a registered voter to vote once and emit Voted event
      Workflow startVotingSession/endVotingSession
        ✓ Require - startVotingSession - Should revert when called from not owner
        ✓ Require - startVotingSession - Should emit WorkflowStatusChange with status from 2 to 3
        ✓ Require - startVotingSession - Should not allow ending proposal registering when not started yet
        ✓ Require - endVotingSession - Should revert when called from not owner
        ✓ Require - endVotingSession - Should not allow ending proposal registering when not started yet
        ✓ Event - endVotingSession - Should emit WorkflowStatusChange with status from 3 to 4
    Tally votes
      ✓ Require - Should not allow to tallyVote when caller is not owner
      ✓ Require - Should not allow to tally vote when voting session is not ended
      ✓ Event - Tally - winningProposalID should stay at default value 0 when there are no votes and emit tally event
      ✓ Event - Tally - winningProposalID should be set to winning proposal

  35 passing (3s)
```

<a href="gas-consumption"></a>
### Gas consumption

```bash
·------------------------------------------|----------------------------|-------------|-----------------------------·
|           Solc version: 0.8.17           ·  Optimizer enabled: false  ·  Runs: 200  ·  Block limit: 30000000 gas  │
···········································|····························|·············|······························
|  Methods                                                                                                          │
·············|·····························|··············|·············|·············|···············|··············
|  Contract  ·  Method                     ·  Min         ·  Max        ·  Avg        ·  # calls      ·  eur (avg)  │
·············|·····························|··············|·············|·············|···············|··············
|  Voting    ·  addProposal                ·           -  ·          -  ·      59280  ·            7  ·          -  │
·············|·····························|··············|·············|·············|···············|··············
|  Voting    ·  addVoter                   ·       50208  ·      50220  ·      50219  ·           17  ·          -  │
·············|·····························|··············|·············|·············|···············|··············
|  Voting    ·  endProposalsRegistering    ·           -  ·          -  ·      30599  ·           11  ·          -  │
·············|·····························|··············|·············|·············|···············|··············
|  Voting    ·  endVotingSession           ·           -  ·          -  ·      30533  ·            4  ·          -  │
·············|·····························|··············|·············|·············|···············|··············
|  Voting    ·  setVote                    ·       58101  ·      78013  ·      65207  ·            6  ·          -  │
·············|·····························|··············|·············|·············|···············|··············
|  Voting    ·  startProposalsRegistering  ·           -  ·          -  ·      95032  ·           18  ·          -  │
·············|·····························|··············|·············|·············|···············|··············
|  Voting    ·  startVotingSession         ·           -  ·          -  ·      30554  ·            9  ·          -  │
·············|·····························|··············|·············|·············|···············|··············
|  Voting    ·  tallyVotes                 ·       37849  ·      66477  ·      52163  ·            4  ·          -  │
·············|·····························|··············|·············|·············|···············|··············
|  Deployments                             ·                                          ·  % of limit   ·             │
···········································|··············|·············|·············|···············|··············
|  Voting                                  ·           -  ·          -  ·    2077402  ·        6.9 %  ·          -  │
·------------------------------------------|--------------|-------------|-------------|---------------|-------------·
```

<a href="coverage"></a>
### Coverage

```bash
|-------------|----------|----------|----------|----------|-----------------|
| File        |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Lines |
|-------------|----------|----------|----------|----------|-----------------|
| contracts/  |      100 |      100 |      100 |      100 |                 |
|  Voting.sol |      100 |      100 |      100 |      100 |                 |
|-------------|----------|----------|----------|----------|-----------------|
| All files   |      100 |      100 |      100 |      100 |                 |
|-------------|----------|----------|----------|----------|-----------------|
```