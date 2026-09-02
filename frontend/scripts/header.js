const menuBtn = document.querySelector(".mobile-menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  mobileMenu.classList.toggle("open");
});

const mobileDropdowns = mobileMenu.querySelectorAll(".dropdown");

mobileDropdowns.forEach((dropdown) => {
  const trigger = dropdown.querySelector(".mother-menu");
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isActive = dropdown.classList.contains("active");
    mobileDropdowns.forEach((d) => d.classList.remove("active"));
    if (!isActive) dropdown.classList.add("active");
  });
});
