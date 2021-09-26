var BuyNFT = artifacts.require("./BuyNFT.sol");

module.exports = function(deployer) {
  deployer.deploy(BuyNFT);
};
