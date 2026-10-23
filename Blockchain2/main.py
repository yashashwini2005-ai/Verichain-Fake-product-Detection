from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from qr_generator import generate_qr
from hash_generator import generate_certificate_hash

app = FastAPI(title="Blockchain Certificate Verification System")

# ---------------------------------
# Enable CORS
# ---------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------
# Temporary Storage
# ---------------------------------
certificate_db = {}

# ---------------------------------
# Certificate Model
# ---------------------------------
class Certificate(BaseModel):
    serial_number: str
    student_name: str
    course: str
    issued_by: str
    issue_date: str


# ---------------------------------
# Home API
# ---------------------------------
@app.get("/")
def home():
    return {
        "message": "Backend server is running"
    }


# ---------------------------------
# Issue Certificate
# ---------------------------------
@app.post("/issue-certificate")
def issue_certificate(certificate: Certificate):

    certificate_data = certificate.dict()

    # Generate SHA-256 Hash
    certificate_hash = generate_certificate_hash(certificate_data)

    # Save certificate and hash
    certificate_db[certificate.serial_number] = {
        "certificate": certificate_data,
        "hash": certificate_hash
    }

    return {
        "status": "Certificate Issued Successfully",
        "certificate": certificate_data,
        "certificate_hash": certificate_hash
    }


# ---------------------------------
# Generate QR Code
# ---------------------------------
@app.post("/generate-qr")
def create_qr(serial_number: str):

    if serial_number not in certificate_db:
        return {
            "status": "failed",
            "message": "Certificate not found"
        }

    qr_path = generate_qr(serial_number)

    return {
        "status": "success",
        "serial_number": serial_number,
        "qr_path": qr_path
    }


# ---------------------------------
# Verify Certificate
# ---------------------------------
@app.get("/verify/{serial_number}")
def verify_certificate(serial_number: str):

    if serial_number not in certificate_db:
        return {
            "valid": False,
            "message": "Certificate not found"
        }

    certificate = certificate_db[serial_number]["certificate"]
    certificate_hash = certificate_db[serial_number]["hash"]

    return {
        "valid": True,
        "certificate": certificate,
        "certificate_hash": certificate_hash
    }