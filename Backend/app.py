from flask import Flask, jsonify
from flask_cors import CORS

from blockchain import get_product


app = Flask(__name__)

CORS(app)


@app.route("/")
def home():

    return jsonify({

        "message": "VeriChain Backend Running"

    })


@app.route("/verify/<serial>", methods=["GET"])
def verify(serial):

    try:

        # Single blockchain call
        product = get_product(serial)


        # Check if product exists
        # Assuming your smart contract returns empty serial for non-existing product
        if not product or product[0] == "":

            return jsonify({

                "status": "Fake",

                "message": "Product not registered"

            })


        return jsonify({

            "status": "Genuine",

            "serialNumber": product[0],

            "productName": product[1],

            "manufacturer": product[2],

            "batchNumber": product[3]

        })


    except Exception as e:


        return jsonify({

            "status": "error",

            "message": str(e)

        })



if __name__ == "__main__":

    app.run(

        host="0.0.0.0",

        port=5000,

        debug=False

    )