const { assert } = require("chai");
require("dotenv").config();

let bridge,
  deployerSigner,
  deployerSignerAddr,
  ownerSigner,
  ownerSignerAddr,
  agentSigner,
  agentSignerAddr,
  newOwnerSigner,
  newOwnerSignerAddr;

describe('Bridge', () => {
  before(async() => {
    const contract = await ethers.getContractAt(
      'BridgeProxy',
      0x9845358d820A76aacAd89aCc85093fD9B14F7df8
    );

    const provider = new ethers.providers.AlchemyProvider(
      'kovan', process.env.API_KEY
    );

    deployerSigner = new ethers.Wallet(process.env.DEPLOYER_KEY, provider);
    deployerSignerAddr = await deployerSigner.getAddress();

    ownerSigner = new ethers.Wallet(process.env.OWNER_KEY, provider);
    ownerSignerAddr = await ownerSigner.getAddress();

    agentSigner = new ethers.Wallet(process.env.AGENT_KEY, provider);
    agentSignerAddr = await agentSigner.getAddress();

    newOwnerSigner = new ethers.Wallet(process.env.NEW_OWNER_KEY, provider);
    newOwnerSignerAddr = await newOwnerSigner.getAddress();

  });
  it('should have the deployer registered as an agent', async() => {
    assert(contract.licensed(deployerSignerAddr));
  });
});
