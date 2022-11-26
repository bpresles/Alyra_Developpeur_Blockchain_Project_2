const { ethers } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();

  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.connect(owner).deploy();

  const Attack = await ethers.getContractFactory("AttackVoting");
  const attack = await Attack.connect(owner).deploy(voting.address);

  console.log(`Voting deployed to ${voting.address} by ${owner.address}`);
  console.log(`AttackVoting deployed to ${attack.address} by ${owner.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
