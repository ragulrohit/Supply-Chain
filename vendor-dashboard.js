// Export Button

document.querySelector(".export-btn")
.addEventListener("click", () => {

    alert("Supply Chain Report Exported Successfully!");

});

// Logout Button

document.querySelector(".logout-btn")
.addEventListener("click", () => {

    const confirmLogout =
        confirm("Are you sure you want to logout?");

    if(confirmLogout){
        window.location.href = "login.html";
    }

});

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