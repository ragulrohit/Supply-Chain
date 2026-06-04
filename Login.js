function showForm(type) {
  const vendorForm = document.getElementById("vendorForm");
  const operationsForm = document.getElementById("operationsForm");
  const buttons = document.querySelectorAll(".user-tabs button");

  buttons.forEach((btn) => btn.classList.remove("active"));

  if (type === "vendor") {
    vendorForm.classList.remove("hidden");
    vendorForm.classList.add("fade-in");
    operationsForm.classList.add("hidden");
    operationsForm.classList.remove("fade-in");
    buttons[0].classList.add("active");
  } else {
    operationsForm.classList.remove("hidden");
    operationsForm.classList.add("fade-in");
    vendorForm.classList.add("hidden");
    vendorForm.classList.remove("fade-in");
    buttons[1].classList.add("active");
  }
}



function showStatus(message, isError = false) {
  let status = document.getElementById("loginStatus");
  if (!status) {
    status = document.createElement("p");
    status.id = "loginStatus";
    status.className = "status-msg";
    document.querySelector(".container").appendChild(status);
  }
  status.textContent = message;
  status.classList.toggle("error", isError);
  status.classList.add("show");
  setTimeout(() => status.classList.remove("show"), 2600);
}

document.querySelectorAll(".password-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const field = button.closest(".password-field");
    const input = field.querySelector(".password-input");
    const icon = button.querySelector("i");
    const isPassword = input.type === "password";

    input.type = isPassword ? "text" : "password";
    button.setAttribute(
      "aria-label",
      isPassword ? "Hide password" : "Show password",
    );
    icon.classList.toggle("fa-eye", !isPassword);
    icon.classList.toggle("fa-eye-slash", isPassword);
  });
});

function getVendorNameFromEmail(email) {
  const namePart = email.split("@")[0].replace(/[._-]+/g, " ").trim();

  if (!namePart) {
    return "Vendor";
  }

  return namePart
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

const vendorForm = document.getElementById("vendorForm");
const operationsForm = document.getElementById("operationsForm");
const rememberedVendor = JSON.parse(
  localStorage.getItem("rememberedVendorLogin") || "null",
);
const rememberedOperations = JSON.parse(
  localStorage.getItem("rememberedOperationsLogin") || "null",
);

if (rememberedVendor) {
  vendorForm.querySelector('input[type="email"]').value =
    rememberedVendor.email || "";
  vendorForm.querySelector('input[type="text"]').value =
    rememberedVendor.vendorId || "";
  vendorForm.querySelector('input[name="rememberVendor"]').checked = true;
}

if (rememberedOperations) {
  operationsForm.querySelector('input[type="email"]').value =
    rememberedOperations.email || "";
  operationsForm.querySelector("select").value =
    rememberedOperations.department || "Select Department";
  operationsForm.querySelector('input[name="rememberOperations"]').checked = true;
}

/* Vendor Login */

vendorForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = this.querySelector('input[type="email"]').value;

  const password = this.querySelector(".password-input").value;

  const vendorId = this.querySelector('input[type="text"]').value;
  const rememberVendor = this.querySelector(
    'input[name="rememberVendor"]',
  ).checked;

  if (email && password && vendorId) {
    const vendorSession = {
      email,
      vendorId,
      name: getVendorNameFromEmail(email),
    };

    sessionStorage.setItem("vendorSession", JSON.stringify(vendorSession));

    if (rememberVendor) {
      localStorage.setItem(
        "rememberedVendorLogin",
        JSON.stringify({ email, vendorId }),
      );
    } else {
      localStorage.removeItem("rememberedVendorLogin");
    }

    showStatus("Vendor login successful. Redirecting…");
    setTimeout(() => {
      globalThis.location.href = "vendor-dashboard.html";
    }, 700);
  } else {
    showStatus("Enter any email, password, and vendor ID to continue.", true);
    this.classList.add("shake");
    setTimeout(() => this.classList.remove("shake"), 500);
  }
});

/* Operations Login */

document
  .getElementById("operationsForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const email = this.querySelector('input[type="email"]').value;

    const password = this.querySelector(".password-input").value;
    const department = this.querySelector("select").value;
    const rememberOperations = this.querySelector(
      'input[name="rememberOperations"]',
    ).checked;

    if (email && password) {
      const operationsSession = {
        email,
        department,
        name: getVendorNameFromEmail(email),
      };

      sessionStorage.setItem(
        "operationsSession",
        JSON.stringify(operationsSession),
      );

      if (rememberOperations) {
        localStorage.setItem(
          "rememberedOperationsLogin",
          JSON.stringify({ email, department }),
        );
      } else {
        localStorage.removeItem("rememberedOperationsLogin");
      }

      showStatus("Operations login successful. Redirecting…");
      setTimeout(() => {
        globalThis.location.href = "operations.html";
      }, 700);
    } else {
      showStatus("Enter any email and password to continue.", true);
      this.classList.add("shake");
      setTimeout(() => this.classList.remove("shake"), 500);
    }
  });


 