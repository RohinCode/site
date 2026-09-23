const main = document.querySelector("main");
const token = localStorage.getItem("disjiRohinToken");
const domin = "http://localhost:3000";
SHIPPING_COST = 50000;
let totalPrice;
function priceToNumber(price) {
  const normalizedPrice = price
    .replace(/[۰-۹]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
    .replace(/,/g, "")
    .trim();

  const number = parseFloat(normalizedPrice);

  if (normalizedPrice.includes("میلیون")) {
    return number * 1000000;
  }

  if (normalizedPrice.includes("هزار")) {
    return number * 1000;
  }

  return number;
}

async function start() {
  if (!token) {
    window.location.href = "./user/login.html";
    return;
  }

  try {
    const response = await fetch(`${domin}/api/cart/getProdoct`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    const result = await response.json();

    // توکن نامعتبر / منقضی
    if (!response.ok) {
      if (result.message === "invalid token") {
        localStorage.removeItem("disjiRohinToken");
        window.location.href = "./user/login.html";
      }

      if (result.message === "پیدا نشد") {
        main.style.display = "flex";
        main.style.justifyContent = "center";
        main.style.alignItems = "center";
        main.style.textAlign = "center";
        main.innerHTML = "<h1>سبد خرید شما خالی است</h1>";
        return;
      }
      console.log(result);

      return;
    }
    console.log(result);

    if (result.data.products.length === 0) {
      main.style.display = "flex";
      main.style.justifyContent = "center";
      main.style.alignItems = "center";
      main.style.textAlign = "center";
      main.innerHTML = "<h1>سبد خرید شما خالی است</h1>";
      return;
    }

    createCart(result.data);
  } catch (error) {
    console.log(error);
  }
}

function createCart(cart) {
  const productsContainer = document.createElement("div");

  let totalProductsPrice = 0;

  cart.products.forEach((product) => {
    console.log(product);
    totalProductsPrice +=
      priceToNumber(product.productId.price) * product.quantity;

    const item = document.createElement("div");
    item.classList.add("item");

    item.innerHTML = `
      <img src="${product.productId.img}" alt="${product.productId.name}" />

      <div>
        <h3>${product.productId.name}</h3>

        <div class="left">
          <div class="price">
            ${product.productId.price}
            <span>تومان</span>
          </div>

          <div class="number">
            <span> ${product.quantity}</span>

            <button
              style="background: white; border:none; outline:none; padding:0"
              class="delete"
              data-product-id="${product.productId._id}"
            >
              <i class="fa-solid fa-trash-can" style="font-size:16px;"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    productsContainer.appendChild(item);
  });

  totalPrice = totalProductsPrice + SHIPPING_COST;

  const pay = document.createElement("div");
  pay.classList.add("pay");

  pay.innerHTML = `
    <h4>جزئیات خرید</h4>

    <div class="price">

      <div>
        <p>مجموع قیمت کالاها</p>
        <span>${totalProductsPrice.toLocaleString("fa-IR")}</span>
      </div>

      <div>
        <p>هزینه‌ی ارسال</p>
        <span>${SHIPPING_COST.toLocaleString("fa-IR")}</span>
      </div>

      <div>
        <p>مجموع (به تومان)</p>
        <span>${totalPrice.toLocaleString("fa-IR")}</span>
      </div>

    </div>

    <button id="complateShopping">ادامه</button>
  `;

  main.appendChild(productsContainer);
  main.appendChild(pay);

  // حذف محصول
  const deleteButtons = productsContainer.querySelectorAll(".delete");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const productId = button.dataset.productId;

      try {
        const response = await fetch(`${domin}/api/cart/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify({
            productId,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          console.log(result);
          return;
        }

        console.log(result);

        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    });
  });

  // ادامه‌ی خرید
  const complateBtn = document.querySelector("#complateShopping");

  complateBtn.addEventListener("click", async () => {
    if (!token) {
      window.location.href = "./user/login.html";
      return;
    }

    try {
      const response = await fetch(`${domin}/api/user/me`, {
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

      if (!result.data.address || !result.data.phoneNamber) {
        console.log(result.data);

        document.body.style.display = "flex";
        document.body.style.justifyContent = "center";
        document.body.style.alignItems = "center";
        document.body.style.textAlign = "center";

        document.body.innerHTML = `
          <div class="order-notice">
            <div class="notice-icon">
              <i class="fa-solid fa-circle-info"></i>
            </div>

            <h2>لطفا قبل‌از سفارش اطلاعات خود را کامل کنید</h2>

            <ul>
              <li>وارد بخش پروفایل شوید</li>
              <li>آدرس و شماره تلفن خود را وارد کنید</li>
              <li>به همین صفحه برگردید و سفارش را ادامه دهید</li>
            </ul>

            <button id="continueBtn">
              <a href="./user/user.html">رفتن به پروفایل</a>
            </button>
          </div>
        `;

        return;
      }

      innerhtml();
    } catch (error) {
      console.log(error);
    }
  });
}

start();

function innerhtml() {
  document.body.style.display = "flex";
  document.body.style.justifyContent = "center";
  document.body.style.alignItems = "center";
  document.body.style.textAlign = "center";

  document.body.innerHTML = `
  <div class="order-notice">
    <div class="notice-icon">
      <i class="fa-solid fa-circle-info"></i>
    </div>

    <h2>نکات مهم ثبت سفارش</h2>

    <ul>
      <li>پرداخت فقط و فقط درب منزل و هنگام تحویل محصول انجام می‌شود.</li>
      <li>محصول به آدرسی که قبلاً در حساب کاربری خود ثبت کرده‌اید ارسال می‌شود.</li>
      <li>ارسال محصول معمولاً حدود ۲ تا ۳ روز کاری طول می‌کشد.</li>
      <li>لطفاً قبل از ثبت سفارش، از صحیح بودن آدرس و اطلاعات خود مطمئن شوید.</li>
    </ul>

    <div class="notice-warning">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <span>
        لطفاً قبل از ثبت نهایی سفارش، اطلاعات خود را با دقت بررسی کنید.
      </span>
    </div>

    <button id="continueBtn">
      تأیید و ادامه
    </button>
  </div>
`;
  document.querySelector("#continueBtn").addEventListener("click", async () => {
    try {
      const response = await fetch(`${domin}/api/cart/isComplate`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
          total: totalPrice,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result);
        return;
      }

      document.body.innerHTML = `<div class="order-notice">
    <div class="notice-icon">
      <i class="fa-solid fa-check"></i>
    </div>

    <h2>ثبت شد</h2>

    <ul>
      <li>پرداخت فقط و فقط درب منزل و هنگام تحویل محصول انجام می‌شود.</li>
      <li>محصول به آدرسی که قبلاً در حساب کاربری خود ثبت کرده‌اید ارسال می‌شود.</li>
      <li>ارسال محصول معمولاً حدود ۲ تا ۳ روز کاری طول می‌کشد.</li>
    </ul>
        <button class="btn"><a href=".././index.html">برگشت به صفحه‌ی اصلی</a></button>
  </div>`;
    } catch (error) {
      console.log(error);
    }
  });
}
