const hre = require("hardhat");

async function main() {
  const nadNFT = await hre.ethers.deployContract("NadNFT", ["0x56f519FE49D04a6641c50b61158D92F04c126A0d"], {});

  await nadNFT.waitForDeployment();

  console.log(
    `NadNFT deployed to ${nadNFT.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
