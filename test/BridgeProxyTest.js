const { assert } = require('chai');

let proxy;

describe('BridgeProxy', () => {
  beforeEach(async () => {
    let Bridge = await ethers.getContractFactory("Bridge");
    proxy = await upgrades.deployProxy(Bridge, {initializer: 'initialize'});
    await proxy.deployed();
  });

  it('should initialize state variables in parent contracts', async () => {
    assert.equal(await proxy.symbol(), 'BRDG');
    assert.equal(await proxy.name(), 'Bridge');
    assert.equal((await proxy.tokenId()).toString(), '0');
  });
});
