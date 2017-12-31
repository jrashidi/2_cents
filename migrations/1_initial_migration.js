var Ownable = artifacts.require("Ownable.sol");
var ExternalStorage = artifacts.require('ExternalStorage');

module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.deploy(ExternalStorage);
};
