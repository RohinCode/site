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


// heroSection

let slideIndex = 1;
function setSlide(input, index) {
  slideIndex = index;
  let item = document.querySelector(`#${input}`);
  let slides = [...document.querySelector(".slides").children];
  slides.forEach((element) => {
    element.classList.remove("show-it");
  });
  item.classList.add("show-it");
}

setInterval(() => {
  slideIndex += 1;
  if (slideIndex == 4) {
    slideIndex = 1;
  }
  setSlide(`slide${slideIndex}`, slideIndex);
}, 4000);
