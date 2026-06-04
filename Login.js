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

/* Vendor Login */

document.getElementById("vendorForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = this.querySelector('input[type="email"]').value;

  const password = this.querySelector(".password-input").value;

  const vendorId = this.querySelector('input[type="text"]').value;

  if (email && password && vendorId) {
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

    if (email && password) {
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
