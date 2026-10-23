from blockchain import verify_product, get_product

serial = "SN1001"

exists = verify_product(serial)

print("Product Exists:", exists)

if exists:
    product = get_product(serial)

    print("Serial Number :", product[0])
    print("Product Name  :", product[1])
    print("Manufacturer  :", product[2])
    print("Batch Number  :", product[3])
else:
    print("Product not found.")