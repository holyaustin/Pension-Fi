require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    testnet: {      
      url: `https://rpc.testnet.fantom.network`,
      accounts: [process.env.PRIVATE_KEY],
    },
    mainnet: {     
      url: `https://rpcapi.fantom.network`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};

