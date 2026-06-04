const operationsSession = JSON.parse(
    sessionStorage.getItem("operationsSession") || "null"
);
const rememberedOperations = JSON.parse(
    localStorage.getItem("rememberedOperationsLogin") || "null"
);
const operationsName = document.getElementById("operationsName");

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

    alert("Supply Chain Report Exported Successfully!");

});

const logoutLink = document.querySelector(".logout-menu-item a");

if(logoutLink){
    logoutLink.addEventListener("click", (e) => {

        e.preventDefault();

        const confirmLogout =
            confirm("Are you sure you want to logout?");

        if(confirmLogout){
            sessionStorage.removeItem("operationsSession");
            window.location.href = "Login.html";
        }

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

