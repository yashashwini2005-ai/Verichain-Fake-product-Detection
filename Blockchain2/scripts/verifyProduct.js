const hre = require("hardhat");

async function main() {
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const productRegistry = await hre.ethers.getContractAt(
        "ProductRegistry",
        contractAddress
    );

    const serial = "SN1001";

    const exists = await productRegistry.verifyProduct(serial);

    console.log("Product Exists:", exists);

    if (exists) {
        const product = await productRegistry.getProduct(serial);

        console.log("\nProduct Details");
        console.log("----------------------------");
        console.log("Serial Number :", product[0]);
        console.log("Product Name  :", product[1]);
        console.log("Manufacturer  :", product[2]);
        console.log("Batch Number  :", product[3]);
    } else {
        console.log("❌ Product not found.");
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });