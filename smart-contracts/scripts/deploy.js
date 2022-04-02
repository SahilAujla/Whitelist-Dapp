const { ethers } = require("hardhat");

let contractAddress;

async function main() {
  /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so whitelistContract here is a factory for instances of our Whitelist contract.
  */
  const whitelistContract = await ethers.getContractFactory("Whitelist");

  // here we deploy the contract
  const deployedWhitelistContract = await whitelistContract.deploy(10);
  // 10 is the Maximum number of whitelisted addresses allowed

  // Wait for it to finish deploying
  await deployedWhitelistContract.deployed();

  // print the address of the deployed contract
  console.log("Whitelist Contract Address:", deployedWhitelistContract.address);

  contractAddress = deployedWhitelistContract.address;

  saveAbi();
  saveContractAddress();
}

function saveAbi() {
  const fs = require("fs");

  const abiDir = __dirname + "/../../dapp/constants";

  if (!fs.existsSync(abiDir)) {
    fs.mkdirSync(abiDir);
  }

  const artifact = artifacts.readArtifactSync("Whitelist");

  fs.writeFileSync(
    abiDir + "/Whitelist.json",
    JSON.stringify(artifact, null, 2)
  );
}

function saveContractAddress() {
  const fs = require("fs");

  const abiDir = __dirname + "/../../dapp/constants";

  if (!fs.existsSync(abiDir)) {
    fs.mkdirSync(abiDir);
  }

  const data = `export const WHITELIST_CONTRACT_ADDRESS = "${contractAddress}"`;

  fs.writeFileSync(abiDir + "/contract.js", data);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
