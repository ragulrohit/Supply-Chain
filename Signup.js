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

function showCelebrationPopup(message) {
  const existingPopup = document.querySelector(".celebration-popup-overlay");
  if (existingPopup) {
    existingPopup.remove();
  }

  const overlay = document.createElement("div");
  overlay.className = "celebration-popup-overlay";

  overlay.innerHTML = `
    <div class="celebration-popup">
      <div class="celebration-emoji">🎉</div>
      <h2>Account Created!</h2>
      <p>${message}</p>
      <button type="button" class="popup-btn popup-btn-primary">OK</button>
    </div>
  `;

  document.body.appendChild(overlay);
  overlay
    .querySelector(".popup-btn")
    .addEventListener("click", () => overlay.remove());
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

  showCelebrationPopup("Account created successfully.");
  showStatus("Account created successfully. Redirecting to login...");
  setTimeout(() => {
    globalThis.location.href = "Login.html";
  }, 800);
});
