const { network } = require("hardhat")
const { developmentChains } = require("../../utils/_networks")
const { verify } = require("../../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    log("03.02. Deploying HackAuction Contract")

    const args = []
    const hackAuction = await deploy("HackAuction", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })
    log("03.02. HackAuction Contract Deployed")

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("03.02. Verifying HackAuction Contract")
        await verify(hackAuction.address, args)
        log("03.02. HackAuction Contract Verifyed")
    }
}

module.exports.tags = ["all", "section3"]
