
const API_BASE_URL = "http://127.0.0.1:5000";

const serialInput = document.getElementById("serial");
const verifyForm = document.getElementById("verifyForm");
const verifyButton = document.getElementById("verifyButton");
const scanButton = document.getElementById("scanButton");
const clearInputButton = document.getElementById("clearInput");
const emptyResult = document.getElementById("emptyResult");
const resultContent = document.getElementById("resultContent");
const scannerContainer = document.getElementById("scannerContainer");
const scannerMessage = document.getElementById("scannerMessage");
const historyBody = document.getElementById("historyBody");
const clearHistoryButton = document.getElementById("clearHistory");
const menuToggle = document.getElementById("menuToggle");
const navigation = document.querySelector(".navigation");

let scanner = null;
let isVerifying = false;
let historyItems = [];

// Safely display values returned by the API.
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function showResult(html) {
  emptyResult.hidden = true;
  resultContent.hidden = false;
  resultContent.innerHTML = html;
}

function showLoading(serial) {
  showResult(`
    <div class="result-status result-loading">
      <div class="status-symbol"><i class="fa-solid fa-spinner"></i></div>
      <div>
        <h2>Verifying product...</h2>
        <p>Checking registration for ${escapeHTML(serial)}.</p>
      </div>
    </div>
    <div class="chain-note">
      <i class="fa-solid fa-link"></i>
      Contacting the VeriChain backend and blockchain.
    </div>
  `);
}

function showError(title, message, serial = "") {
  showResult(`
    <div class="result-status result-error">
      <div class="status-symbol"><i class="fa-solid fa-triangle-exclamation"></i></div>
      <div>
        <h2>${escapeHTML(title)}</h2>
        <p>${escapeHTML(message)}</p>
      </div>
    </div>
    ${serial ? `<p class="details-title">Serial number: ${escapeHTML(serial)}</p>` : ""}
    <div class="chain-note">
      <i class="fa-solid fa-circle-info"></i>
      Check the message above before trying again.
    </div>
  `);
}

function showProductResult(data, serial) {
  const details = [
    ["Serial Number", data.serialNumber || serial],
    ["Product Name", data.productName || "Not provided"],
    ["Manufacturer", data.manufacturer || "Not provided"],
    ["Batch Number", data.batchNumber || "Not provided"]
  ];

  const rows = details.map(([label, value]) => `
    <div class="detail-row">
      <span class="detail-label">${escapeHTML(label)}</span>
      <span class="detail-value">${escapeHTML(value)}</span>
    </div>
  `).join("");

  showResult(`
    <div class="result-status result-genuine">
      <div class="status-symbol"><i class="fa-solid fa-check"></i></div>
      <div>
        <h2>Genuine Product</h2>
        <p>This product is registered and its details were returned by the verification API.</p>
      </div>
    </div>
    <h3 class="details-title">Product details</h3>
    <div class="product-details">${rows}</div>
    <div class="chain-note">
      <i class="fa-solid fa-cubes"></i>
      Product record retrieved through your connected blockchain backend.
    </div>
  `);
}

function showUnregistered(serial, message) {
  showResult(`
    <div class="result-status result-fake">
      <div class="status-symbol"><i class="fa-solid fa-xmark"></i></div>
      <div>
        <h2>Product Not Registered</h2>
        <p>${escapeHTML(message || "No matching product record was found.")}</p>
      </div>
    </div>
    <h3 class="details-title">Verification details</h3>
    <div class="product-details">
      <div class="detail-row">
        <span class="detail-label">Serial Number</span>
        <span class="detail-value">${escapeHTML(serial)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Registration</span>
        <span class="detail-value">No matching record</span>
      </div>
    </div>
    <div class="chain-note">
      <i class="fa-solid fa-circle-info"></i>
      Do not treat this product as verified. An unregistered result alone does not prove counterfeiting.
    </div>
  `);
}

function setVerifying(loading) {
  isVerifying = loading;
  verifyButton.disabled = loading;
  scanButton.disabled = loading;
  verifyButton.innerHTML = loading
    ? '<i class="fa-solid fa-spinner fa-spin"></i><span>Verifying...</span>'
    : '<i class="fa-solid fa-shield-halved"></i><span>Verify Product</span>';
}

function addToHistory(serial, data) {
  const status = data.status;
  let label = "Error";
  let className = "error";
  let product = "—";

  if (status === "Genuine") {
    label = "Genuine";
    className = "genuine";
    product = data.productName || "Registered product";
  } else if (status === "Fake") {
    label = "Not registered";
    className = "fake";
    product = "—";
  }

  // Keep the latest check for each serial at the top.
  historyItems = historyItems.filter(item => item.serial !== serial);
  historyItems.unshift({
    serial,
    product,
    label,
    className,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })
  });

  historyItems = historyItems.slice(0, 10);
  renderHistory();
}

function renderHistory() {
  if (historyItems.length === 0) {
    historyBody.innerHTML = `
      <tr class="history-empty">
        <td colspan="4">No checks yet. Verify a product to see it here.</td>
      </tr>
    `;
    return;
  }

  historyBody.innerHTML = historyItems.map(item => `
    <tr>
      <td><strong>${escapeHTML(item.serial)}</strong></td>
      <td>${escapeHTML(item.product)}</td>
      <td>
        <span class="history-badge ${item.className}">
          <i class="fa-solid ${
            item.className === "genuine"
              ? "fa-check-circle"
              : item.className === "fake"
                ? "fa-times-circle"
                : "fa-exclamation-circle"
          }"></i>
          ${escapeHTML(item.label)}
        </span>
      </td>
      <td>${escapeHTML(item.time)}</td>
    </tr>
  `).join("");
}

async function verifyProduct() {
  if (isVerifying) return;

  const serial = serialInput.value.trim();

  if (!serial) {
    serialInput.focus();
    showError("Serial number required", "Enter a product serial number before verifying.");
    return;
  }

  if (serial.length > 100) {
    showError("Invalid serial number", "Please enter a serial number with at most 100 characters.");
    return;
  }

  setVerifying(true);
  showLoading(serial);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    let response;

    try {
      response = await fetch(
        `${API_BASE_URL}/verify/${encodeURIComponent(serial)}`,
        {
          method: "GET",
          headers: { "Accept": "application/json" },
          signal: controller.signal
        }
      );
    } finally {
      clearTimeout(timeoutId);
    }

    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error("The backend returned an invalid response. Check Flask's terminal.");
    }

    if (!response.ok) {
      throw new Error(data.message || `Backend returned HTTP ${response.status}.`);
    }

    console.log("Verification response:", data);

    if (data.status === "Genuine") {
      showProductResult(data, serial);
      addToHistory(serial, data);
    } else if (
      data.status === "Fake" ||
      (data.status === "error" && /product not found/i.test(data.message || ""))
    ) {
      showUnregistered(serial, data.message || "Product not registered.");
      addToHistory(serial, { status: "Fake" });
    } else {
      const errorData = { status: "error" };
      addToHistory(serial, errorData);
      showError("Verification failed", data.message || "The backend could not verify this product.", serial);
    }
  } catch (error) {
    console.error("Verification error:", error);

    const message = error.name === "AbortError"
      ? "The request timed out. Check whether the backend and blockchain are running."
      : error instanceof TypeError
        ? "Cannot reach the Flask API. Start the backend and check the API address."
        : error.message || "An unexpected error occurred.";

    addToHistory(serial, { status: "error" });
    showError("Unable to complete verification", message, serial);
  } finally {
    setVerifying(false);
  }
}

// Submit with Enter or the Verify Product button.
verifyForm.addEventListener("submit", event => {
  event.preventDefault();
  verifyProduct();
});

// Sample serial buttons fill the input; they do not fake a result.
document.querySelectorAll(".sample-chip").forEach(button => {
  button.addEventListener("click", () => {
    serialInput.value = button.dataset.serial || "";
    serialInput.focus();
  });
});

clearInputButton.addEventListener("click", () => {
  serialInput.value = "";
  serialInput.focus();
});

clearHistoryButton.addEventListener("click", () => {
  historyItems = [];
  renderHistory();
});

// QR scanner.
scanButton.addEventListener("click", async () => {
  scannerContainer.hidden = false;
  scannerMessage.textContent = "";

  if (typeof Html5QrcodeScanner === "undefined") {
    scannerMessage.textContent = "QR scanner library did not load. Check your internet connection and reload.";
    return;
  }

  if (scanner) return;

  try {
    scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 220, height: 220 },
        rememberLastUsedCamera: true
      },
      false
    );

    scanner.render(
      async decodedText => {
        // QR codes may contain a serial number or a URL ending in the serial.
        const scannedValue = decodedText.trim();
        let serial = scannedValue;

        try {
          const url = new URL(scannedValue);
          const parts = url.pathname.split("/").filter(Boolean);
          if (parts.length) serial = parts[parts.length - 1];
        } catch {
          // The QR content is not a URL, so use it as the serial number.
        }

        serialInput.value = serial;
        scannerMessage.textContent = "QR code scanned. Verifying product...";

        const activeScanner = scanner;
        scanner = null;

        try {
          await activeScanner.clear();
        } catch (error) {
          console.warn("Could not stop scanner cleanly:", error);
        }

        scannerContainer.hidden = true;
        verifyProduct();
      },
      () => {
        // Scanner emits frequent messages while looking for a QR code.
      }
    );
  } catch (error) {
    console.error("Scanner error:", error);
    scannerMessage.textContent = "Could not start the camera. Allow camera permission and try again.";
    scanner = null;
  }
});

document.getElementById("closeScanner").addEventListener("click", async () => {
  if (scanner) {
    const activeScanner = scanner;
    scanner = null;
    try {
      await activeScanner.clear();
    } catch (error) {
      console.warn("Could not stop scanner cleanly:", error);
    }
  }
  scannerContainer.hidden = true;
  scannerMessage.textContent = "";
});

// Mobile navigation.
menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});
