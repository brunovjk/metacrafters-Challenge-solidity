import { ethers } from "hardhat";

async function main() {
  const [owner, otherAccount] = await ethers.getSigners();
  console.log("Account 1:", owner.address.toString());
  console.log("Account 2:", otherAccount.address.toString());

  const BrunoVJK = await ethers.getContractFactory("BrunoVJK");
  const brunovjk = await BrunoVJK.deploy();
  await brunovjk.deployed();

  console.log("BrunoVJK contract address:", brunovjk.address);

  const mintTotal = 100000000000000000000n; // 100 Tokens
  const halfMintTotal = 50000000000000000000n; // 50 Tokens

  // Mint mintTotal VJKTokens
  await brunovjk.mint(owner.address, mintTotal);
  console.log("Minted!");

  // Transfer 1/2 mintTotal VJKTokens
  await brunovjk.transfer(otherAccount.address, halfMintTotal);
  console.log("Transferred!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
