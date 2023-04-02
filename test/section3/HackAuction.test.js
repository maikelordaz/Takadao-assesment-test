const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../utils/_networks")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("HackAuction unit tests", function () {
          let auction, auctionDeployer, auctionAlice, auctionBob

          beforeEach(async () => {
              // Get the accounts
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              Alice = accounts[1]
              Bob = accounts[2]
              // Deploy contracts
              await deployments.fixture(["section3"])
              auction = await ethers.getContract("Auction", deployer)
              hackAuction = await ethers.getContract("HackAuction", deployer)
              // Connect the users
              auctionDeployer = auction.connect(deployer)
              auctionAlice = auction.connect(Alice)
              auctionBob = auction.connect(Bob)

              hackAuctionDeployer = hackAuction.connect(deployer)
              hackAuctionAlice = hackAuction.connect(Alice)
              hackAuctionBob = hackAuction.connect(Bob)
          })

          it("Should make the hack", async function () {
              //const currentLeader = await ethers.provider.getStorageAt(auction.address, 0)
              //const amountToBid = await ethers.provider.getStorageAt(auction.address, 1)
          })
      })
