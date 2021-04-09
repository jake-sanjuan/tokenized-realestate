async function main() {

  const [deployer] = await ethers.getSigners();

  console.log(
    "Deployed by:", deployer.address,
    "\nShould be deployed by: 0x605C9B6f969A27982Fe1Be16e3a24F6720A14beD"
  );

  const Bridge = await ethers.getContractFactory("Bridge");
  const bridge = await Bridge.deploy();
  await bridge.deployed();
  let bridgeAddress = bridge.address;

  const BridgeLibrary = await ethers.getContractFactory('BridgeLibrary');
  const bridgeLibrary = await BridgeLibrary.deploy();
  await bridgeLibrary.deployed();

  const BridgeLinkQueries = await ethers.getContractFactory('BridgeLinkQueries');
  const bridgeLinkQueries = await BridgeLinkQueries.deploy();
  await bridgeLinkQueries.deployed();

  const BridgeProxy = await ethers.getContractFactory('BridgeLinkQueries');
  const bridgeProxy = await BridgeProxy.deploy(bridgeAddress);
  await bridgeProxy.deployed();

  console.log("Deployed to:", bridgeProxy.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
