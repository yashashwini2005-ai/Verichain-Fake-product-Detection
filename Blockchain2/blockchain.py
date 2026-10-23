import json
import os

from web3 import Web3
from dotenv import load_dotenv


load_dotenv()


RPC_URL = os.getenv("RPC_URL")
CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")



# Connect to Ganache

web3 = Web3(
    Web3.HTTPProvider(
        RPC_URL,
        request_kwargs={
            "timeout": 10
        }
    )
)



if not web3.is_connected():

    raise Exception(
        "❌ Cannot connect to Ganache"
    )


print("✅ Connected to Ganache")



# Load ABI

with open("abi/ProductRegistry.json", "r") as file:

    contract_data = json.load(file)



abi = contract_data["abi"]



# Contract instance

contract = web3.eth.contract(

    address=Web3.to_checksum_address(
        CONTRACT_ADDRESS
    ),

    abi=abi

)



print("✅ Smart Contract Connected")




def get_product(serial):

    """
    Get product details from blockchain
    """

    try:


        product = contract.functions.getProduct(
            serial
        ).call()



        print(
            "Blockchain Response:",
            product
        )



        return product



    except Exception as e:


        print(
            "Blockchain Error:",
            str(e)
        )


        return None