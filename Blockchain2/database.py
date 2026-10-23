from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

client.admin.command("ping")
print("✅ MongoDB Connected Successfully!")

db = client["FakeProductDB"]

products = db["Products"]
scan_logs = db["ScanLogs"]

print("✅ Database Selected : FakeProductDB")
print("✅ Collections Ready : Products, ScanLogs")