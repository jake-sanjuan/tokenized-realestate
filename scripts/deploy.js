async function main() {

  const [deployer] = await ethers.getSigners();

  console.log(
    "Deployed by:", deployer.address,
    "\nShould be deployed by: 0x605C9B6f969A27982Fe1Be16e3a24F6720A14beD"
  )

  const Contract = await ethers.getContractFactory("Tokenizer");
  const contract = await Contract.deploy();
  await contract.deployed();

  console.log("Tokenizer deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
