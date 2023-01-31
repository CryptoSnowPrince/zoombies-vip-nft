import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true
    }
  },
  solidity: "0.8.17",
  settings: {
    optimizer: { enabled: true, runs: 200 },
    metadata: {
      bytecodeHash: 'none',
    },
    outputSelection: {
      '*': {
        '*': ['storageLayout'],
      },
    },
  },
};

export default config;
