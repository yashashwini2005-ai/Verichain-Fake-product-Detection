
const hre = require("hardhat");

async function main() {
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3Remove-Item -Recurse -Force Backend\.git";

    const productRegistry = await hre.ethers.getContractAt(
        "ProductRegistry",
        contractAddress
    );

    const products = [
        { serial: "SN1001", name: "iPhone 16", manufacturer: "Apple", batch: "APPLE001" },
        { serial: "SN1002", name: "Galaxy S25 Ultra", manufacturer: "Samsung", batch: "SAMSUNG001" },
        { serial: "SN1003", name: "OnePlus 14", manufacturer: "OnePlus", batch: "ONEPLUS001" },
        { serial: "SN1004", name: "Pixel 10 Pro", manufacturer: "Google", batch: "GOOGLE001" },
        { serial: "SN1005", name: "Redmi Note 16 Pro", manufacturer: "Xiaomi", batch: "XIAOMI001" },
        { serial: "SN1006", name: "Vivo X300", manufacturer: "Vivo", batch: "VIVO001" },
        { serial: "SN1007", name: "OPPO Find X9", manufacturer: "OPPO", batch: "OPPO001" },
        { serial: "SN1008", name: "Nothing Phone 4", manufacturer: "Nothing", batch: "NOTHING001" },
        { serial: "SN1009", name: "Moto Edge 70", manufacturer: "Motorola", batch: "MOTO001" },
        { serial: "SN1010", name: "Realme GT 8 Pro", manufacturer: "Realme", batch: "REALME001" },

        { serial: "SN1011", name: "iPhone 16 Pro", manufacturer: "Apple", batch: "APPLE002" },
        { serial: "SN1012", name: "Galaxy S25", manufacturer: "Samsung", batch: "SAMSUNG002" },
        { serial: "SN1013", name: "OnePlus 13", manufacturer: "OnePlus", batch: "ONEPLUS002" },
        { serial: "SN1014", name: "Pixel 9 Pro", manufacturer: "Google", batch: "GOOGLE002" },
        { serial: "SN1015", name: "Redmi Note 14 Pro", manufacturer: "Xiaomi", batch: "XIAOMI002" },
        { serial: "SN1016", name: "Vivo X200", manufacturer: "Vivo", batch: "VIVO002" },
        { serial: "SN1017", name: "OPPO Reno 13", manufacturer: "OPPO", batch: "OPPO002" },
        { serial: "SN1018", name: "Nothing Phone 3", manufacturer: "Nothing", batch: "NOTHING002" },
        { serial: "SN1019", name: "Motorola Edge 60", manufacturer: "Motorola", batch: "MOTO002" },
        { serial: "SN1020", name: "Realme GT 7 Pro", manufacturer: "Realme", batch: "REALME002" },

        { serial: "SN1021", name: "iPhone 17 Pro Max", manufacturer: "Apple", batch: "APPLE003" },
        { serial: "SN1022", name: "Galaxy Z Fold 7", manufacturer: "Samsung", batch: "SAMSUNG003" },
        { serial: "SN1023", name: "OnePlus 13R", manufacturer: "OnePlus", batch: "ONEPLUS003" },
        { serial: "SN1024", name: "Pixel 10", manufacturer: "Google", batch: "GOOGLE003" },
        { serial: "SN1025", name: "Redmi Note 15 Pro", manufacturer: "Xiaomi", batch: "XIAOMI003" },
        { serial: "SN1026", name: "Vivo V50", manufacturer: "Vivo", batch: "VIVO003" },
        { serial: "SN1027", name: "OPPO Reno 14 Pro", manufacturer: "OPPO", batch: "OPPO003" },
        { serial: "SN1028", name: "Nothing Phone 3a Pro", manufacturer: "Nothing", batch: "NOTHING003" },
        { serial: "SN1029", name: "Motorola Razr 60 Ultra", manufacturer: "Motorola", batch: "MOTO003" },
        { serial: "SN1030", name: "Realme GT 7", manufacturer: "Realme", batch: "REALME003" }
    ];

    let successCount = 0;
    let failureCount = 0;

    for (const product of products) {
        console.log(`Registering ${product.serial}...`);

        try {
            const tx = await productRegistry.registerProduct(
                product.serial,
                product.name,
                product.manufacturer,
                product.batch
            );

            await tx.wait();
            successCount++;
            console.log(`✅ ${product.serial} registered successfully`);
        } catch (err) {
            failureCount++;
            console.log(`❌ ${product.serial} failed: ${err.shortMessage || err.message}`);
        }
    }

    console.log(`\nRegistration finished: ${successCount} succeeded, ${failureCount} failed.`);

    if (failureCount > 0) {
        process.exitCode = 1;
    }
}

main().catch((error) => {
    console.error("Registration script failed:", error);
    process.exitCode = 1;
});
