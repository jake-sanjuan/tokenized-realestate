pragma solidity ^0.6.0;

library BridgeLibrary {

  struct ChainlinkReturn {
    bytes32 name;
    bytes32 addr;
  }

  struct DataToChainlinkQuery {
    string url;
    string namePath;
    string addrPath;
  }
}
