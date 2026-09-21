import { left, domin } from "./changeItem.js";
import { token } from "./admin.js";

const ORDERS_PER_PAGE = 3;

let currentPage = 0;
let allOrders = [];

export default async function showOrders() {
  try {
    const response = await fetch(`${domin}/api/cart/Registered`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result);
      return;
    }
    if (!Array.isArray(result.data)) {
      left.innerHTML = `
    <section class="orders-page">
      <h2>سفارش‌ها</h2>
      <p>${result.message}</p>
    </section>
`;
      return;
    }

    allOrders = result.data;
    currentPage = 0;
    console.log(result);

    renderOrders();
  } catch (error) {
    console.log(error);
  }
}

function renderOrders() {
  console.log(2);
  const start = currentPage * ORDERS_PER_PAGE;
  const end = start + ORDERS_PER_PAGE;

  const orders = allOrders.slice(start, end);

  left.innerHTML = `
    <section class="orders-page">

      <div class="orders-header">

        <div>
          <h2>سفارش‌ها</h2>

          <p>
            لیست سفارش‌های ثبت‌شده توسط کاربران
          </p>
        </div>

        <span class="orders-count">
          ${allOrders.length} سفارش
        </span>

      </div>


      <div class="orders-list">

        ${orders
          .map((order, index) => {
            console.log(order.user);
            const productsHTML = order.products

              .map((product) => {
                return `
                <div class="order-product">

                  <img
                    src="${product.img}"
                    alt="${product.name}"
                  />

                  <div class="product-info">

                    <h4>
                      ${product.name}
                    </h4>

                    <div class="product-details">

                      <span>
                        قیمت: ${product.price}
                      </span>

                    </div>

                  </div>

                </div>
              `;
              })
              .join("");

            return `
            <article class="order-card">

              <div class="order-top">

                <div>
                  <span class="order-number">
                    سفارش #${start + index + 1}
                  </span>

                  <span class="order-status">
                    در انتظار ارسال
                  </span>
                </div>

              </div>


              <div class="customer-info">

                <div class="customer-title">

                  <i class="fa-solid fa-user"></i>

                  <h3>
                    اطلاعات سفارش‌دهنده
                  </h3>

                </div>


                <div class="customer-grid">

                  <div class="info-item">

                    <span>
                      نام
                    </span>

                    <strong>
                      ${order.user.name}
                    </strong>

                  </div>


                  <div class="info-item">

                    <span>
                      ایمیل
                    </span>

                    <strong>
                      ${order.user.email}
                    </strong>

                  </div>


                  <div class="info-item">

                    <span>
                      شماره تماس
                    </span>

                    <strong>
                     ${order.user.phoneNamber}
                    </strong>

                  </div>


                  <div class="info-item">

                    <span>
                      آدرس
                    </span>

                    <strong>
                      ${order.user.address}
                    </strong>

                  </div>

                </div>

              </div>


              <div class="products-section">

                <div class="products-title">

                  <i class="fa-solid fa-box"></i>

                  <h3>
                    محصولات سفارش
                  </h3>

                  <span>
                    ${order.products.length} محصول
                  </span>

                </div>


                <div class="order-products">${productsHTML}

                </div>

              </div>


              <div class="order-bottom">

                <div class="order-total">

                  <span>
                    مبلغ کل سفارش
                  </span>

                  <strong>
                   ${order.totalPrice.toLocaleString()} تومان
                  </strong>

                </div>


                <button
                  class="delivered-btn"
                  type="button"
                  data-order-id="${order._id}"
                >

                  <i class="fa-solid fa-check"></i>

                  سفارش تحویل داده شد. حذف محصول از دیتابیس
                </button>

              </div>

            </article>
            `;
          })
          .join("")}

      </div>


      ${
        end < allOrders.length
          ? `<button
              class="next-orders"
              type="button"
              id="nextOrders"
            >
              نمایش ۴ سفارش بعدی
            </button>`
          : ""
      }

    </section>
  `;

  const deliveredButtons = document.querySelectorAll(".delivered-btn");

  deliveredButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const orderId = button.dataset.orderId;

      try {
        const response = await fetch(`${domin}/api/cart/isDelivered`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify({
            orderId: orderId,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          console.log(result);
          return;
        }

        console.log(result);
      } catch (error) {
        console.log(error);
      }
    });
  });

  const nextOrders = document.querySelector("#nextOrders");

  if (nextOrders) {
    nextOrders.addEventListener("click", () => {
      currentPage++;

      renderOrders();
    });
  }
}
