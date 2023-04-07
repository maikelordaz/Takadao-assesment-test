require("dotenv").config()

require("@nomiclabs/hardhat-waffle")
require("hardhat-deploy")
require("solidity-coverage")

/******************************************** Private Keys *********************************************/
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY

/******************************************** Deployer address *****************************************/
const DEPLOYER = "0x3904F59DF9199e0d6dC3800af9f6794c9D037eb1"
const ALICE = "0xa354bAF1c0C42caed01deb672BFA6b66Ef61a8B4"
const BOB = "0xd26235AF7919C81470481fF4436B5465B0bbF6F2"

/******************************************* RPC providers **********************************************/
const MUMBAI_TESTNET_RPC_URL = process.env.MUMBAI_TESTNET_RPC_URL

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
        testnet_mumbai: {
            chainId: 80001,
            accounts: [DEPLOYER_PRIVATE_KEY],
            url: MUMBAI_TESTNET_RPC_URL,
            blockConfirmations: 6,
            timeout: 300000,
        },
    },
    namedAccounts: {
        deployer: {
            testnet_mumbai: DEPLOYER,

            default: 0,
            localhost: 0,
        },
        Alice: {
            testnet_mumbai: ALICE,

            default: 1,
            localhost: 1,
        },
        Bob: {
            testnet_mumbai: BOB,

            default: 2,
            localhost: 2,
        },
    },
    mocha: {
        timeout: 300000,
    },
}
