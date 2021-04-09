pragma solidity ^0.6.0;

import "@openzeppelin/contracts/proxy/Proxy.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BridgeProxy is Proxy, Ownable {

  address private implementation;

  constructor(address _implementationAddr) public {
    implementation = _implementationAddr;
  }

  function _implementation() internal virtual view override returns (address) {
    return implementation;
  }

  function upgradeImplementation(address _implementationAddr) external onlyOwner {
    implementation = _implementationAddr;
  }

}
