const items = document.querySelectorAll(".menu-btns .item");
export const left = document.querySelector(".left");
export const domin = "http://localhost:3000";
import { showReports, showSupport } from "./report.js";
import showProfile from "./profile.js";
import showAddProduct from "./product.js";
import showOrders from "./order.js";


items.forEach((item) => {
  item.addEventListener("click", () => {
    const page = item.dataset.page;

    setActiveItem(item);
    changePage(page);
  });
});

function setActiveItem(activeItem) {
  items.forEach((item) => {
    item.classList.remove("item-active");
  });

  activeItem.classList.add("item-active");
}

function changePage(page) {
  if (page === "profile") {
    showProfile();
    return;
  }

  if (page === "add-product") {
    showAddProduct();
    return;
  }

  if (page === "orders") {
    showOrders();
    return;
  }

  if (page === "reports") {
    showReports();
    return;
  }

  if (page === "support") {
    showSupport();
    return;
  }
}
