const menuItems = document.querySelectorAll(".menu li");

menuItems.forEach(item => {

    item.addEventListener("click", () => {

        // Remove active class
        menuItems.forEach(li => {
            li.classList.remove("active");
        });

        // Add active class
        item.classList.add("active");

        // Navigate
        const page = item.getAttribute("data-page");

        if(page){
            window.location.href = page;
        }

    });

});


document.addEventListener("DOMContentLoaded", () => {

    const logoutBtn = document.getElementById("logoutBtn");

    logoutBtn.addEventListener("click", () => {

        const confirmLogout = confirm("Are you sure you want to logout?");

        if (confirmLogout) {
            window.location.href = "login.html";
        }

    });

});

document.querySelector(".export-btn")
.addEventListener("click", () => {

    alert("Supply Chain Report Exported Successfully!");

});