
import json
import os
from pathlib import Path

from web3 import Web3
from dotenv import load_dotenv

# Always load configuration relative to this file
BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

RPC_URL = os.getenv("RPC_URL", "http://127.0.0.1:8545")
CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")

print("DEBUG RPC_URL:", RPC_URL)
print("DEBUG CONTRACT_ADDRESS:", CONTRACT_ADDRESS)

if not CONTRACT_ADDRESS:
    raise RuntimeError("CONTRACT_ADDRESS is missing from Backend/.env")

web3 = Web3(
    Web3.HTTPProvider(
        RPC_URL,
        request_kwargs={"timeout": 10}
    )
)

if not web3.is_connected():
    raise RuntimeError(f"Cannot connect to blockchain at {RPC_URL}")

print("Connected to blockchain")

# Load the ABI from the Backend folder
abi_path = BASE_DIR / "abi" / "ProductRegistry.json"

with open(abi_path, "r", encoding="utf-8") as file:
    contract_data = json.load(file)

abi = contract_data["abi"]
address = Web3.to_checksum_address(CONTRACT_ADDRESS)

# Check that a contract is deployed at the configured address
code = web3.eth.get_code(address)

if len(code) == 0:
    raise RuntimeError(
        f"No contract deployed at {address}. Check the address and network."
    )

contract = web3.eth.contract(address=address, abi=abi)

print("Smart contract connected:", address)



def get_product(serial):
    """Return product details, or None if the product is not registered."""
    try:
        product = contract.functions.getProduct(serial).call()
        print("Blockchain response:", product)
        return product
    except Exception as e:
        error_message = str(e)
        if "Product not found" in error_message:
            print(f"Product not registered: {serial}")
            return None
        print("Blockchain error:", error_message)
        raise

