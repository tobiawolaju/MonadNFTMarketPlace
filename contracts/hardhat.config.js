
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: "../.env" });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  networks: {
    monad: {
      url: process.env.MONAD_RPC_URL || "https://testnet-rpc.monad.xyz",
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
