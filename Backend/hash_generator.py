import hashlib

def generate_certificate_hash(certificate_data: dict):
    """
    Generates SHA-256 hash for certificate data.
    """

    # Convert dictionary into a consistent string
    data = (
        certificate_data["serial_number"] +
        certificate_data["student_name"] +
        certificate_data["course"] +
        certificate_data["issued_by"] +
        certificate_data["issue_date"]
    )

    # Generate SHA-256 hash
    hash_value = hashlib.sha256(data.encode()).hexdigest()

    return hash_value