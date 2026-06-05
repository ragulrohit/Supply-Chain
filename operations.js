const operationsSession = JSON.parse(
    sessionStorage.getItem("operationsSession") || "null"
);
const rememberedOperations = JSON.parse(
    localStorage.getItem("rememberedOperationsLogin") || "null"
);
const operationsName = document.getElementById("operationsName");

function showCelebrationPopup(message, options = {}) {
    const existingPopup = document.querySelector(".celebration-popup-overlay");
    if(existingPopup){
        existingPopup.remove();
    }

    const overlay = document.createElement("div");
    overlay.className = "celebration-popup-overlay";

    const popup = document.createElement("div");
    popup.className = "celebration-popup";

    const actions = options.confirm
        ? `<div class="celebration-popup-actions">
            <button type="button" class="popup-btn popup-btn-secondary" data-popup-cancel>Cancel</button>
            <button type="button" class="popup-btn popup-btn-primary" data-popup-confirm>Yes</button>
          </div>`
        : `<button type="button" class="popup-btn popup-btn-primary" data-popup-ok>OK</button>`;

    popup.innerHTML = `
        <div class="celebration-emoji">🎉</div>
        <h2>${options.title || "Great News!"}</h2>
        <p>${message}</p>
        ${actions}
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    const closePopup = () => overlay.remove();

    overlay.querySelector("[data-popup-ok]")?.addEventListener("click", closePopup);
    overlay.querySelector("[data-popup-cancel]")?.addEventListener("click", closePopup);
    overlay.querySelector("[data-popup-confirm]")?.addEventListener("click", () => {
        closePopup();
        options.onConfirm?.();
    });
}

function getUserNameFromEmail(email) {
    const namePart = email.split("@")[0].replace(/[._-]+/g, " ").trim();

    if(!namePart){
        return "Operations";
    }

    return namePart
        .split(" ")
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

if(operationsName){
    if(operationsSession?.name){
        operationsName.textContent = operationsSession.name;
    } else if(rememberedOperations?.email){
        operationsName.textContent = getUserNameFromEmail(rememberedOperations.email);
    }
}

document.querySelector(".export-btn")
.addEventListener("click", () => {

    showCelebrationPopup("Supply Chain Report Exported Successfully!");

});

const logoutLink = document.querySelector(".logout-menu-item a");

if(logoutLink){
    logoutLink.addEventListener("click", (e) => {

        e.preventDefault();

        showCelebrationPopup("Are you sure you want to logout?", {
            title: "Confirm Logout",
            confirm: true,
            onConfirm: () => {
            sessionStorage.removeItem("operationsSession");
            window.location.href = "Login.html";
            },
        });

    });
}

const menuItems =
document.querySelectorAll(".dashboard-menu li");

menuItems.forEach(item => {

    item.addEventListener("click", () => {

        menuItems.forEach(i =>
            i.classList.remove("active")
        );

        item.classList.add("active");

    });

});

setInterval(() => {

    const shipmentCard =
    document.querySelector(".card h2");

    if(shipmentCard){

        let value =
        parseInt(shipmentCard.innerText);

        shipmentCard.innerText =
        value + Math.floor(Math.random() * 2);

    }

}, 10000);


// In vendor-dashboard.js
const name = document.getElementById('operationsName')?.textContent?.trim();
if (name) {
  const sidebarNameEl = document.getElementById('sidebarUserName');
  if (sidebarNameEl) sidebarNameEl.textContent = name;
}
