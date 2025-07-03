const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const nadNFT = await hre.ethers.deployContract("NadNFT", [deployer.address], {});
  await nadNFT.waitForDeployment();
  console.log(`NadNFT deployed to ${nadNFT.target}`);

  const nadMarketplace = await hre.ethers.deployContract("NadMarketplace", [deployer.address], {});
  await nadMarketplace.waitForDeployment();
  console.log(`NadMarketplace deployed to ${nadMarketplace.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
