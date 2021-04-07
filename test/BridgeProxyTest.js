const { assert } = require('chai');

let proxy;

describe('BridgeProxy', () => {
  before(async () => {
    let Bridge = await ethers.getContractFactory("Bridge");
    proxy = await upgrades.deployProxy(Bridge);
  });

  it('should initialize state variables in parent contracts', async () => {
    assert.equal(await proxy.fee().toString(), '1');
  });
});
