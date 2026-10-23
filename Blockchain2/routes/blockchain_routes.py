from flask import Blueprint, jsonify
from blockchain import verify_product

blockchain_bp = Blueprint("blockchain", __name__)

@blockchain_bp.route("/verify/<serial>", methods=["GET"])
def verify(serial):

    product = verify_product(serial)

    if product:
        return jsonify({
            "success": True,
            "product": product
        })

    return jsonify({
        "success": False,
        "message": "Product not found"
    })