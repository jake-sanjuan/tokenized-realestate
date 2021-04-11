const hre = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigners();

  console.log('deployer:', deployer.address);

  const Bridge = await hre.ethers.getContractFactory("Bridge");
  const bridge = await Bridge.deploy();

  await bridge.deployed();

  console.log("bridge deployed to:", bridge.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
