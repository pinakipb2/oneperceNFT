// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract BuyNFT {
  address[8] public item;

  function buyItem(uint itemId) public payable returns (uint) {
    require(itemId >= 1 && itemId <= 7);
    item[itemId] = msg.sender;
    return itemId;
  }

  function getItems() public view returns (address[8] memory) {
    return item;
  }
}
