const menuBtn = document.getElementById("menuBtn");
const menuIcon = document.getElementById("menuIcon");
const navLinks = document.querySelector(".link");

function setMenuState(isOpen) {
  navLinks.classList.toggle("active", isOpen);
  menuBtn.setAttribute("aria-expanded", String(isOpen));

  if (menuIcon) {
    menuIcon.classList.remove("fa-bars", "fa-xmark");
    menuIcon.classList.add(isOpen ? "fa-xmark" : "fa-bars");
  }
}

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const isOpen = !navLinks.classList.contains("active");
    setMenuState(isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });
}

const loader = document.getElementById("stacklyLoader");

if (loader) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hide");
      setTimeout(() => loader.remove(), 450);
    }, 1200);
  });
}

const bannerTitle = document.querySelector(".services-banner h1");

if (bannerTitle && !bannerTitle.dataset.letterAnimated) {
  bannerTitle.dataset.letterAnimated = "true";
  bannerTitle.innerHTML = [...bannerTitle.textContent]
    .map((char, index) => {
      const safeChar = char === " " ? "&nbsp;" : char;
      return `<span class="letter" style="animation-delay:${index * 45}ms">${safeChar}</span>`;
    })
    .join("");
}

const reveals = document.querySelectorAll(
  ".why-k2s, .clients, .card, .cta-section, .footer",
);

window.addEventListener("scroll", () => {
  reveals.forEach((item) => {
    const top = item.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      item.classList.add("active", "reveal");
    }
  });
});
