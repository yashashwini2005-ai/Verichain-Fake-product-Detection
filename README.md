# 🔗 VeriChain – Fake Product Detection Using Blockchain

**A Blockchain-Based Product Authentication System to Detect Counterfeit Products**

VeriChain is a blockchain-based product authentication system that helps customers verify whether a product is registered and genuine by using QR codes, a web application, and smart contract verification.

---

## 📌 Project Overview

Counterfeit products are a serious problem across industries such as pharmaceuticals, electronics, luxury goods, food, and automotive parts.

VeriChain provides a product verification platform in which manufacturers can register product information on a blockchain smart contract. Customers can enter a product serial number or scan its QR code to check whether a matching product record exists.

The application retrieves the result through a Python Flask backend connected to a blockchain network.

**Key features:**
- 🔐 Blockchain-based product registration
- 🔎 Product verification using serial numbers
- 📱 QR code scanning support
- 🧾 Product details including manufacturer and batch number
- ⚡ Interactive web interface with verification results
- 🕒 Recent verification history in the browser session

> **Note:** VeriChain checks whether a product record exists on the connected blockchain. An unregistered product is flagged for further verification; this alone does not conclusively prove that a physical product is counterfeit.

## 🚨 Problem Statement

Counterfeit products can affect consumer safety, brand reputation, and supply chain reliability.

Traditional product verification systems may depend on centralized databases that can be modified or compromised. Customers may also have difficulty accessing reliable product information at the point of purchase.

VeriChain explores how blockchain records and QR code-based verification can help make product authentication more transparent and accessible.

## 💡 Proposed Solution

VeriChain connects a web-based interface, a Flask API, and a Solidity smart contract.

### How it works

1. A manufacturer registers a product using its serial number and details.
2. The smart contract stores the product record on the blockchain.
3. A QR code can be generated for the product serial number.
4. A customer enters the serial number or scans the QR code.
5. The frontend sends a request to the Flask backend.
6. The backend queries the deployed smart contract.
7. The application displays the verification result and, when available, the product details.

## 🏗️ System Architecture

```text
           PRODUCT REGISTRATION
                    |
                    v
          Product Details
                    |
                    v
         Solidity Smart Contract
                    |
                    v
         Local Ethereum Network
                    |
                    v
             Product Record


           PRODUCT VERIFICATION
                    |
                    v
          Customer / QR Code
                    |
                    v
         Frontend Web Application
           HTML, CSS, JavaScript
                    |
                    v
             Flask REST API
                    |
                    v
                 Web3.py
                    |
                    v
         ProductRegistry Contract
                    |
                    v
          Verify Serial Number
                    |
                    v
         Product Details / Result
```

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Web page structure |
| CSS3 | Responsive interface and styling |
| JavaScript | Frontend interaction and API requests |
| HTML5 QR Code | QR code scanning |
| Python | Backend programming |
| Flask | REST API development |
| Flask-CORS | Frontend-backend communication |
| Web3.py | Connecting Python to the blockchain |
| Solidity | Writing the product registry smart contract |
| Ethereum-compatible local network | Running the smart contract |
| Hardhat | Contract development and deployment |
| Node.js and npm | Blockchain development dependencies |
| Git and GitHub | Source code management |

## 🔐 Smart Contract Functionality

The `ProductRegistry.sol` smart contract stores and verifies product records.

Each product record contains:

- **Serial Number** – unique product identifier
- **Product Name** – name of the product
- **Manufacturer** – manufacturer name
- **Batch Number** – product batch identifier

### Main functions

- `registerProduct()` – registers a product on the blockchain.
- `verifyProduct()` – checks whether a serial number is registered.
- `getProduct()` – retrieves the details of a registered product.

The smart contract provides a transparent record of registered products. Its protections depend on the contract design, access controls, and the integrity of the registration process.

## 📂 Project Structure

```text
AI-fake-product/
│
├── .gitignore
│
├── Backend/
│   ├── app.py
│   ├── blockchain.py
│   ├── database.py
│   ├── hash_generator.py
│   ├── qr_generator.py
│   ├── models.py
│   ├── abi/
│   ├── routes/
│   ├── scripts/
│   └── qr_codes/
│
├── Blockchain2/
│   ├── contracts/
│   │   └── ProductRegistry.sol
│   ├── scripts/
│   │   ├── deploy.js
│   │   ├── registerProduct.js
│   │   └── verifyProduct.js
│   ├── hardhat.config.js
│   ├── package.json
│   └── abi/
│
└── Frontend/
    ├── index.html
    ├── script.js
    └── style.css
```

*The tree shows the main application files; additional files may be present in the repository.*

## ⚙️ Installation and Setup

### Prerequisites

Install the following tools before running the application:

- Python 3
- Node.js and npm
- Git
- A browser such as Chrome
- VS Code (recommended)

### 1. Clone the repository

Replace `<repository-url>` with the HTTPS URL of your GitHub repository.

```bash
git clone <repository-url>
cd AI-fake-product
```

### 2. Set up the blockchain

Open a terminal in the `Blockchain2` directory:

```bash
cd Blockchain2
npm install
```

Start the local Hardhat blockchain in **Terminal 1**:

```bash
npx hardhat node
```

Keep this terminal running.

In **Terminal 2**, deploy the contract:

```bash
cd Blockchain2
npx hardhat run scripts/deploy.js --network localhost
```

Copy the deployed contract address from the output.

Update the contract address in the following locations so they all refer to the same deployment:

- `Backend/.env`
- `Blockchain2/scripts/registerProduct.js`
- `Blockchain2/scripts/verifyProduct.js`

Register the sample products:

```bash
npx hardhat run scripts/registerProduct.js --network localhost
```

Wait for the registration script to finish successfully.

> **Important:** Restarting the local Hardhat node creates a fresh local blockchain state. Deploy the contract and register the products again after a restart.

### 3. Configure the backend

Open a terminal in the `Backend` directory:

```bash
cd Backend
python -m venv venv
```

Activate the virtual environment on Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

Install the backend dependencies:

```bash
pip install -r requirements.txt
```

Create a local `Backend/.env` file containing the configuration required by your backend:

```dotenv
MONGO_URI=your_mongodb_connection_string
RPC_URL=http://127.0.0.1:8545
CONTRACT_ADDRESS=your_deployed_contract_address
```

Replace the placeholders with valid local configuration values. Keep `.env` out of GitHub and never share database credentials publicly.

If your backend does not use MongoDB for a particular workflow, configure the database only as required by the code.

Start Flask:

```bash
python app.py
```

The backend should be available at:

```text
http://127.0.0.1:5000
```

### 4. Start the frontend

Open another terminal:

```bash
cd Frontend
python -m http.server 5500
```

Open the application in your browser:

```text
http://127.0.0.1:5500/index.html
```

The QR scanner may require browser camera permission and an internet connection to load its scanning library.

## 🔄 Working Process

### Product registration flow

```text
Product Information
        |
        v
registerProduct()
        |
        v
Smart Contract
        |
        v
Blockchain Record
        |
        v
QR Code Generation
```

### Product verification flow

```text
Enter Serial Number / Scan QR
              |
              v
        Frontend JavaScript
              |
              v
         Flask API Request
              |
              v
        Web3.py Connection
              |
              v
       Smart Contract Query
              |
              v
       Check Product Record
              |
       +------+------+
       |             |
       v             v
  Registered     Unregistered
       |             |
       v             v
  Show Details   Show Warning
```

## 🌍 Real-World Applications

- 💊 **Pharmaceuticals:** help customers check medicine registration records.
- 📱 **Electronics:** check registered device or component identifiers.
- 👑 **Luxury goods:** support product authentication workflows.
- 🍔 **Food products:** provide product record lookup for supply chain applications.
- 🚗 **Automotive parts:** check whether spare-part identifiers have registered records.

These are potential applications; they require suitable product registration, identity controls, and deployment-specific integrations.

## ✅ Advantages

- 🔒 Uses blockchain-based product records.
- 📱 Supports QR-based verification.
- 🔍 Provides quick serial number lookup.
- 🧾 Displays registered product information.
- 🌐 Combines a web interface with a smart contract backend.
- 🤝 Can improve transparency in product authentication workflows.

## 🚀 Future Enhancements

- Deploy the smart contract to a suitable public blockchain or testnet.
- Add manufacturer authentication and role-based access control.
- Develop a mobile application.
- Add AI-based counterfeit packaging detection.
- Integrate IoT-based supply chain tracking.
- Maintain complete product lifecycle records.
- Add automated testing and continuous integration.
- Add secure product ownership and transfer history.

## 🎯 Conclusion

VeriChain demonstrates how blockchain, Solidity smart contracts, QR codes, Python, and web technologies can be combined to build a product verification application.

The system allows customers to check product registration records through a simple interface while exploring the use of blockchain to improve transparency and trust in product authentication.

---

## 👩‍💻 Project Information

**Project Name:** VeriChain – Fake Product Detection Using Blockchain  
**Category:** Blockchain / Web Application  
**Core Technologies:** Python, Flask, Web3.py, Solidity, Hardhat, HTML, CSS, JavaScript

**Disclaimer:** This is an academic/demo project. A blockchain registration check alone cannot guarantee the authenticity of a physical product.

