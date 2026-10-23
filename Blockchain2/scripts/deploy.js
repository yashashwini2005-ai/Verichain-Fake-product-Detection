const hre = require("hardhat");

async function main() {
  console.log("Deploying ProductRegistry contract...");

  // Get the contract factory
  const ProductRegistry = await hre.ethers.getContractFactory("ProductRegistry");

  // Deploy the contract
  const productRegistry = await ProductRegistry.deploy();

  // Wait for deployment to complete (Ethers v6)
  await productRegistry.waitForDeployment();

  // Get deployed contract address
  const contractAddress = await productRegistry.getAddress();

  console.log("--------------------------------");
  console.log("✅ Contract deployed successfully!");
  console.log("Contract Address:", contractAddress);
  console.log("--------------------------------");
}

main().catch((error) => {
  console.error("Deployment failed:");
  console.error(error);
  process.exitCode = 1;
});