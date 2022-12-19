const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const transactionsFactory = await hre.ethers.getContractFactory("Transactions");
  const transactionsContract = await transactionsFactory.deploy();
  await transactionsContract.deployed();
  console.log("Transactions address: ", transactionsContract.address);

  fs.writeFileSync('./config3.js', `
  export const transactionsContract = "${transactionsContract.address}"
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
