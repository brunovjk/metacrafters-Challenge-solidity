import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("BrunoVJK", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const mintTotal = 100;

    const BrunoVJK = await ethers.getContractFactory("BrunoVJK");
    const brunovjk = await BrunoVJK.deploy();

    return { brunovjk, owner, otherAccount, mintTotal };
  }

  describe("Deployment", function () {
    it("Should print the BrunoVJK contract address", async function () {
      const { brunovjk } = await loadFixture(deployOneYearLockFixture);
      console.log("BrunoVJK contract address:", brunovjk.address);
      expect(brunovjk.address);
    });

    it("Should mint to owner 100 vjk tokens", async function () {
      const { brunovjk, owner, mintTotal } = await loadFixture(
        deployOneYearLockFixture
      );
      // Balance Before
      const balanceBefore = await brunovjk.balanceOf(owner.address);
      console.log(
        "Owner VJK balance before mint:",
        balanceBefore.toString(),
        "VJK"
      );
      // Mint mintTotal VJKTokens
      await brunovjk.mint(owner.address, mintTotal);
      // Balance After
      const balanceAfter = await brunovjk.balanceOf(owner.address);
      console.log(
        "Owner VJK balance after mint:",
        balanceAfter.toString(),
        "VJK"
      );
      expect(balanceAfter - balanceBefore).to.equal(mintTotal);
    });

    it("Should mint to owner 100 vjk tokens and tranfer 1/2 vjk to other account", async function () {
      const { brunovjk, owner, otherAccount, mintTotal } = await loadFixture(
        deployOneYearLockFixture
      );
      // Balance Before
      const balanceBefore = await brunovjk.balanceOf(otherAccount.address);
      console.log(
        "Other account VJK balance before mint:",
        balanceBefore.toString(),
        "VJK"
      );
      await brunovjk.mint(owner.address, mintTotal);
      await brunovjk.transfer(otherAccount.address, mintTotal / 2);

      // Balance After
      const balanceAfter = await brunovjk.balanceOf(otherAccount.address);
      console.log(
        "Other account VJK balance after mint:",
        balanceAfter.toString(),
        "VJK"
      );
      expect(balanceAfter - balanceBefore).to.equal(mintTotal / 2);
    });
  });
});
