const { ethers } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.connect(owner).deploy();

  console.log(`SimpleStorage deployed to ${voting.address} by ${owner.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
