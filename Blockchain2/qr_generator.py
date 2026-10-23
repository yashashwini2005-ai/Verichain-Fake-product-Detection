import qrcode
import os

def generate_qr(serial_number):
    folder = "qr_codes"
    os.makedirs(folder, exist_ok=True)

    qr = qrcode.make(serial_number)

    file_name = f"{serial_number}.png"

    file_path = os.path.join(folder, file_name)

    qr.save(file_path)

    return file_path


if __name__ == "__main__":

    serial_numbers = [
        "SN1001",
        "SN1002",
        "SN1003",
        "SN1004",
        "SN1005",
        "SN1006",
        "SN1007",
        "SN1008",
        "SN1009",
        "SN1010"
    ]

    for serial in serial_numbers:
        path = generate_qr(serial)
        print(f"✅ QR created: {path}")