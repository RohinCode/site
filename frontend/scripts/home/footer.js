const navA = document.querySelectorAll("footer nav a");

navA.forEach((element) => {
  element.addEventListener("click", () => {
    navA.forEach((item) => {
      item.classList.remove("active");
    });

    element.classList.add("active");
  });
});
