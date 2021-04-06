pragma solidity ^0.6.0;

import "@openzeppelin/contracts/proxy/UpgradeableProxy.sol";

contract BridgeProxy is UpgradeableProxy {

  constructor() public UpgradeableProxy(0x605C9B6f969A27982Fe1Be16e3a24F6720A14beD, "") {

  }

}
