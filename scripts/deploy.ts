import { ethers } from "hardhat";

async function main() {
  const ZoombiesVIP = await ethers.getContractFactory("ZoombiesVIP");
  const zoombies_vip = await ZoombiesVIP.deploy();

  await zoombies_vip.deployed();

  console.log(`Zoombies VIP NFT deployed to ${zoombies_vip.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
