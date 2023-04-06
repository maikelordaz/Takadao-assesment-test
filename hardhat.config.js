require("dotenv").config()

require("@nomiclabs/hardhat-waffle")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-contract-sizer")

/***************************************** Config ******************************************************/

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.7",
                settings: {
                    optimizer: {
                        enabled: true,
                    },
                },
            },
        ],
    },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            blockConfirmations: 1,
            initialBaseFeePerGas: 0,
        },
        localhost: {
            chainId: 31337,
            timeout: 60000,
        },
    },

    namedAccounts: {
        deployer: {
            default: 0,
            localhost: 0,
        },
        Alice: {
            default: 1,
            localhost: 1,
        },
        Bob: {
            default: 2,
            localhost: 2,
        },
    },
    mocha: {
        timeout: 300000,
    },
    contractSizer: {
        alphaSort: true,
        runOnCompile: true,
    },
}
