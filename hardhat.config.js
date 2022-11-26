require("@nomicfoundation/hardhat-toolbox");

require('dotenv').config();
require('solidity-coverage');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.17',
  },
  networks: {
    dev: {
      accounts: {
        count: 10,
        mnemonic: `${process.env.MNEMONIC}`,
      },
      url: 'http://localhost:8545',
      chainId: 31337,
    },
    goerli: {
      accounts: {
        count: 10,
        mnemonic: `${process.env.MNEMONIC}`,
      },
      chainId: 5,
      url: `https://goerli.infura.io/v3/${process.env.INFURA_ID}`
    },
    sepolia: {
      accounts: {
        count: 10,
        mnemonic: `${process.env.MNEMONIC}`,
      },
      chainId: 11155111,
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_ID}`
    },
    mumbai: {
      accounts: {
        count: 10,
        mnemonic: `${process.env.MNEMONIC}`,
      },
      chainId: 80001,
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_ID}`
    }
  },
  gasReporter: {
    enabled: true,
    currency: "USD"
  }
};
