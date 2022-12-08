const { ethers, upgrades } = require("hardhat");

async function main() {
  const ethProvider = require('eth-provider') // eth-provider is a simple EIP-1193 provider
      const frame = ethProvider('frame') // Connect to Frame
  
  const ERC20UpgradableV1 = await ethers.getContractFactory(
    "ERC20UpgradableV1"
  );
  console.log("Deploying ERC20UpgradableV1...");
  const contract = await upgrades.deployProxy(ERC20UpgradableV1, [], {
    initializer: "initialize",
    kind: "transparent",
  });
  const tx= await contract.getDeployTransaction()


   // Set `tx.from` to current Frame account
   tx.from = (await frame.request({ method: 'eth_requestAccounts' }))[0]
      
   // Sign and send the transaction using Frame
   await frame.request({ method: 'eth_sendTransaction', params: [tx] })
  console.log("ERC20UpgradableV1 deployed to:", contract.address);
}

main();
