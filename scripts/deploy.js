import { ethers } from "hardhat";

async function main() {
  console.log("Deploying GuessQuest contract...");

  // Get the ContractFactory and Signers here.
  const GuessQuest = await ethers.getContractFactory("GuessQuest");
  const guessQuest = await GuessQuest.deploy();

  await guessQuest.waitForDeployment();

  const contractAddress = await guessQuest.getAddress();
  console.log("GuessQuest deployed to:", contractAddress);

  // Update the CONTRACT_ADDRESS in web3-config.ts with the deployed address
  console.log("\n📋 Update CONTRACT_ADDRESS in src/app/web3-config.ts:");
  console.log(`export const CONTRACT_ADDRESS = '${contractAddress}'`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
