const vendorSession = JSON.parse(
    sessionStorage.getItem("vendorSession") || "null"
);
const rememberedVendor = JSON.parse(
    localStorage.getItem("rememberedVendorLogin") || "null"
);
const vendorName = document.getElementById("vendorName");

function getVendorNameFromEmail(email) {
    const namePart = email.split("@")[0].replace(/[._-]+/g, " ").trim();

    if(!namePart){
        return "Vendor";
    }

    return namePart
        .split(" ")
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

if(vendorName){
    if(vendorSession?.name){
        vendorName.textContent = vendorSession.name;
    } else if(rememberedVendor?.email){
        vendorName.textContent = getVendorNameFromEmail(rememberedVendor.email);
    }
}

// Export Button

document.querySelector(".export-btn")
.addEventListener("click", () => {

    alert("Supply Chain Report Exported Successfully!");

});

// Logout Button

const logoutLink = document.querySelector(".logout-menu-item a");

if(logoutLink){
    logoutLink.addEventListener("click", (e) => {

        e.preventDefault();

        const confirmLogout =
            confirm("Are you sure you want to logout?");

        if(confirmLogout){
            sessionStorage.removeItem("vendorSession");
            window.location.href = "Login.html";
        }

    });
}

// Dashboard Menu Active State

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

// Auto Update KPI Demo

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
const name = document.getElementById('vendorName')?.textContent?.trim();
if (name) {
  const sidebarNameEl = document.getElementById('sidebarUserName');
  if (sidebarNameEl) sidebarNameEl.textContent = name;
}

