const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const PensionFi = await hre.ethers.getContractFactory("PensionFi");
  const pensionFi = await PensionFi.deploy();
  await pensionFi.deployed();
  console.log("pensionFi deployed to:", pensionFi.address);

  fs.writeFileSync('./config.js', `
  export const PensionFiAddress = "${pensionFi.address}"
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
