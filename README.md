AI-Fake-Product-Detection
🔗 VeriChain - Fake Product Detection Using Blockchain
A Blockchain-Based Product Authentication System to Detect Counterfeit Products

📌 Project Overview
VeriChain is a blockchain-based fake product detection system that helps users verify the authenticity of products using QR codes and blockchain technology.

The system allows manufacturers to securely register product details on a blockchain network. Customers can scan the QR code attached to a product and instantly check whether the product is Genuine or Fake.

Blockchain ensures that product information remains secure, transparent, and tamper-proof.

🚨 Problem Statement
Counterfeit products are a major problem in many industries:

💊 Pharmaceuticals
📱 Electronics
👑 Luxury Products
🍔 Food Products
🚗 Automotive Parts
Traditional verification systems depend on centralized databases that can be modified or manipulated.

Customers often cannot easily identify whether a product is original or counterfeit.

💡 Proposed Solution
VeriChain provides a decentralized product verification system using blockchain.

The system works as follows:
Manufacturer registers product details.
A unique serial number is generated for each product.
Product information is stored in a blockchain smart contract.
A QR code containing the serial number is generated.
Customer scans the QR code.
The system verifies product details from blockchain.
The result is displayed:
✅ Genuine Product
❌ Fake Product

🏗️ System Architecture
                 Manufacturer
                      |
                      |
              Register Product
                      |
                      ↓
          Solidity Smart Contract
                      |
                      ↓
            Ethereum Blockchain
                 (Ganache)


Customer
    |
    |
 Scan QR Code
    |
    ↓
Frontend Application
(HTML + CSS + JavaScript)
    |
    ↓
Flask Backend API
    |
    ↓
Web3.py Connection
    |
    ↓
Smart Contract Verification
    |
    ↓
 Genuine / Fake Result
🛠️ Technologies Used
Frontend Technologies
Technology	Purpose
HTML5	User interface structure
CSS3	Styling and design
JavaScript	Frontend logic
HTML5 QR Code Scanner	QR code scanning functionality
Backend Technologies
Technology	Purpose
Python	Backend programming
Flask	API development
Flask-CORS	Frontend-backend communication
Web3.py	Blockchain interaction
Blockchain Technologies
Technology	Purpose
Solidity	Smart contract development
Ethereum	Blockchain platform
Ganache	Local blockchain network
Hardhat	Smart contract development and deployment
🔐 Smart Contract Functionality
The Solidity smart contract manages product information on blockchain.

Register Product
Stores:

Product Serial Number
Product Name
Manufacturer Name
Batch Number
Verify Product
Retrieves product information using the serial number.

Blockchain provides:

✅ Data security
✅ Transparency
✅ Tamper resistance
✅ Trust between manufacturers and customers
📂 Project Structure
AI-fake-product/

│
├── Backend/
│
│   ├── app.py
│   ├── blockchain.py
│   ├── qr_generator.py
│   ├── abi/
│   ├── qr_codes/
│   └── requirements.txt
│
│
├── Blockchain2/
│
│   ├── contracts/
│   │     └── ProductRegistry.sol
│   │
│   ├── scripts/
│   │     ├── deploy.js
│   │     └── registerProduct.js
│   │
│   ├── hardhat.config.js
│   └── package.json
│
│
└── Frontend/
    │
    ├── index.html
    ├── script.js
    └── style.css

⚙️ Installation and Setup
1. Clone Repository
git clone <repository-url>
Navigate to project:

cd AI-fake-product
⛓️ Blockchain Setup
Navigate to blockchain folder:

cd Blockchain2
Install dependencies:

npm install
Start Ganache blockchain.

Deploy smart contract:

npx hardhat run scripts/deploy.js --network localhost
Register products:

npx hardhat run scripts/registerProduct.js --network localhost
Copy the deployed contract address and update it in backend configuration.

🐍 Backend Setup
Navigate to backend:

cd Backend
Create virtual environment:

python -m venv venv
Activate environment:

Windows
venv\Scripts\activate
Install dependencies:

pip install -r requirements.txt
Run Flask server:

python app.py
Backend will run at:

http://127.0.0.1:5000
🌐 Frontend Setup
Navigate to frontend folder:

cd Frontend
Open:

index.html
or use VS Code Live Server extension.

🔄 Working Process
Product Registration Flow
Product Details
        |
        ↓
Smart Contract
        |
        ↓
Blockchain Storage
        |
        ↓
QR Code Generation
Product Verification Flow
Scan QR Code
        |
        ↓
Extract Serial Number
        |
        ↓
Send Request to Flask API
        |
        ↓
Connect with Blockchain
        |
        ↓
Retrieve Product Details
        |
        ↓
Display Result
🌍 Real-World Applications
💊 Pharmaceutical Industry
Prevent fake medicines
Verify drug authenticity
Improve patient safety
📱 Electronics Industry
Authenticate smartphones
Verify original components
👑 Luxury Brands
Protect brand identity
Prevent fake products
🍔 Food Industry
Track product origin
Improve supply chain transparency
🚗 Automotive Industry
Verify genuine spare parts
✅ Advantages
🔒 Secure blockchain-based verification
🔍 Quick QR code authentication
🌐 Transparent product information
🚫 Reduces counterfeit products
🤝 Builds customer trust
📦 Improves supply chain security
🚀 Future Enhancements
Deploy on Ethereum mainnet or Polygon
Develop mobile application
Add manufacturer authentication
Add AI-based fake packaging detection
Integrate IoT-based tracking
Maintain complete product lifecycle history
🎯 Conclusion
VeriChain provides a secure and transparent solution for fake product detection by combining:

Blockchain technology
Smart contracts
QR code verification
Web applications
The system helps manufacturers protect their products and enables customers to verify authenticity easily.
