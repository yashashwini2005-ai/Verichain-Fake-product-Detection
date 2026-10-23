let scanner = null;


// ===============================
// START QR SCANNER
// ===============================

function startScanner() {

    if (scanner !== null) {
        return;
    }


    scanner = new Html5QrcodeScanner(
        "reader",
        {
            fps: 10,

            qrbox: {
                width: 250,
                height: 250
            },

            rememberLastUsedCamera: true,

            showTorchButtonIfSupported: true
        }
    );


    scanner.render(
        onScanSuccess,
        onScanFailure
    );

}



// ===============================
// QR SUCCESS
// ===============================

function onScanSuccess(decodedText) {


    console.log("Scanned QR:", decodedText);


    let serial = decodedText.trim();



    // Put serial into input box

    document.getElementById("serial").value = serial;



    // Stop camera

    if (scanner !== null) {

        scanner.clear();

        scanner = null;

    }



    // Verify automatically

    verifyProduct();

}



// ===============================
// QR FAILURE
// ===============================

function onScanFailure(error) {

    // Ignore scanning errors

}



// ===============================
// VERIFY PRODUCT
// ===============================

async function verifyProduct() {


    const serial =
        document.getElementById("serial").value.trim();



    const result =
        document.getElementById("result");



    if(serial === "") {


        result.innerHTML = `

        <div class="danger">

        Please enter product serial number

        </div>

        `;

        return;

    }



    result.innerHTML = `

    <h3>🔍 Checking Blockchain...</h3>

    `;



    try {


        const response = await fetch(

            `http://127.0.0.1:5000/verify/${encodeURIComponent(serial)}`

        );



        const data = await response.json();



        console.log("Backend Data:", data);



        // Flask error

        if(data.status === "error") {

            throw new Error(data.message);

        }




        // Genuine product

        if(data.status === "Genuine") {



            result.innerHTML = `


            <div class="success">


                <h2>
                ✅ Genuine Product
                </h2>



                <p>
                <b>Serial Number:</b>
                ${data.serialNumber}
                </p>



                <p>
                <b>Product Name:</b>
                ${data.productName}
                </p>



                <p>
                <b>Manufacturer:</b>
                ${data.manufacturer}
                </p>



                <p>
                <b>Batch Number:</b>
                ${data.batchNumber}
                </p>



            </div>


            `;


        }



        // Fake product

        else {



            result.innerHTML = `


            <div class="danger">


                <h2>
                ❌ Fake Product
                </h2>



                <p>
                ${data.message}
                </p>



            </div>


            `;


        }



    }



    catch(error) {



        console.error(
            "Verification Error:",
            error
        );



        result.innerHTML = `


        <div class="danger">


            <h2>
            ⚠️ Backend Not Connected
            </h2>



            <p>
            ${error.message}
            </p>



            <p>
            Start Flask using:
            <br>
            python app.py
            </p>



        </div>


        `;


    }


}