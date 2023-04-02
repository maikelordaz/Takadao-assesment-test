const { network } = require("hardhat")
const { developmentChains } = require("../../utils/_networks")
const { verify } = require("../../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    log("03.01. Deploying Auction Contract")

    const args = []
    const auction = await deploy("Auction", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })
    log("03.01. Auction Contract Deployed")

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("03.01. Verifying Auction Contract")
        await verify(auction.address, args)
        log("03.01. Auction Contract Verifyed")
    }
}

module.exports.tags = ["all", "section3"]
