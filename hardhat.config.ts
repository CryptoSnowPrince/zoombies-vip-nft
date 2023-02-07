import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const { privateKey, privateKey1, privateKey2 } = require('./.secrets.json');

const config: HardhatUserConfig = {
  networks: {
    localhost: {
			url: "http://127.0.0.1:7545",
			chainId: 1337,
			//accounts: [privateKey, privateKey1, privateKey2] // Insert your private key here
			accounts: {
				mnemonic: "decorate stumble online deliver opera clog clinic bracket crop caught parrot flee"
			},
		},
		moonbase: {
			url: "https://rpc.api.moonbase.moonbeam.network",
			chainId: 1287,
			accounts: [privateKey] // Insert your private key here
		},
		moonbeam: {
			url: "https://rpc.api.moonbeam.network",
			chainId: 1284,
			accounts: [privateKey] // Insert your private key here
		},
    hardhat: {
      allowUnlimitedContractSize: true
    }
  },
  solidity: "0.8.17",
  settings: {
    optimizer: {
       enabled: true,
       runs: 200
    },
    metadata: {
      bytecodeHash: 'none',
    },
    outputSelection: {
      '*': {
        '*': ['storageLayout'],
      },
    },
  },
  gasReporter: {
	  enabled: true
	}
};

export default config;
