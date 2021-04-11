const { assert } = require("chai");

const PROPERT_OWNER_NAME = 'Jake San Juan';
const PROPERTY_ADDRESS = '3 Main Street';
const ZIP_CODE = 84070;

let bridge, ownerSigner, ownerAddr, otherSigner, otherAddr;

describe("Bridge", () => {
  before(async() => {

    const Bridge = await ethers.getContractFactory('Bridge');
    bridge = await Bridge.deploy();
    await bridge.deployed();

    ownerSigner = ethers.provider.getSigner(0);
    ownerAddr = await ownerSigner.getAddress();
  });

  describe('we call the "registerProperty()" function', async() => {
    let receipt;
    before(async() => {
      let tx = await bridge.registerProperty(
        PROPERT_OWNER_NAME,
        PROPERTY_ADDRESS,
        ZIP_CODE
      );
      receipt = await tx.wait();
    });
    it('should mint a token with an id of 0', async() => {
      let tokenId = receipt.events[0].args.tokenId;
      assert.equal(tokenId.toNumber(), 0);
    });
    it('should set the function caller as the owner', async() => {
      assert.equal(await bridge.ownerOf(0), ownerAddr);
    });
    it('should have the owner address mapped to the property', async() => {
      assert(await bridge.propertyToOwner(ownerAddr));
    });
  });

  describe('after calling the "registerProperty()" function again', () => {
    let receipt;
    before(async() => {
      await bridge.connect(otherSigner);
      let tx = await bridge.registerProperty(
        PROPERT_OWNER_NAME,
        PROPERTY_ADDRESS,
        ZIP_CODE
      );
      receipt = await tx.wait()
    });
    it('should mint a token with and id of 1', async() => {
      let tokenId = receipt.events[0].args.tokenId;
      assert.equal(tokenId.toNumber(), 1);
    });
  });
});
