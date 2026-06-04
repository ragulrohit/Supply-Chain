function showStatus(message, isError = false) {
  let status = document.getElementById("signupStatus");
  if (!status) {
    status = document.createElement("p");
    status.id = "signupStatus";
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

document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = this.querySelector('input[type="email"]').value.trim();
  const passwords = this.querySelectorAll(".password-input");
  const password = passwords[0].value;
  const confirmPassword = passwords[1].value;
  const accountType = document.getElementById("accountType").value;

  if (!email || !password || !confirmPassword || !accountType) {
    showStatus("Fill all details to create your account.", true);
    this.classList.add("shake");
    setTimeout(() => this.classList.remove("shake"), 500);
    return;
  }

  if (password !== confirmPassword) {
    showStatus("Passwords must match.", true);
    this.classList.add("shake");
    setTimeout(() => this.classList.remove("shake"), 500);
    return;
  }

  showStatus("Account created successfully. Redirecting...");
  setTimeout(() => {
    globalThis.location.href =
      accountType === "vendor" ? "vendor-dashboard.html" : "operations.html";
  }, 800);
});
