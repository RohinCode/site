const number = document.querySelector(".number span");
const minus = document.querySelector(".number .fa-minus");
const plus = document.querySelector(".number .fa-plus");
const main = document.querySelector("main");
const token = localStorage.getItem("disjiRohinToken");
const domin = "http://localhost:3000";
SHIPPING_COST = 50000;

// plus.addEventListener("click", () => {
//   let value = Number(number.textContent);
//   value++;
//   number.textContent = value;
// });

// minus.addEventListener("click", () => {
//   let value = Number(number.textContent);

//   if (value > 0) {
//     value--;
//     number.textContent = value;
//   }
// });

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
      localStorage.removeItem("disjiRohinToken");
      window.location.href = "./user/login.html";
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
    totalProductsPrice += priceToNumber(product.price);

    const item = document.createElement("div");
    item.classList.add("item");

    item.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />

      <div>
        <h3>${product.name}</h3>

        <div class="left">
          <div class="price">
            ${product.price.toLocaleString()}
            <span>تومان</span>
          </div>

          <div class="number">
            <i class="fa-solid fa-plus"></i>
            <span>1</span>
            <i class="fa-solid fa-minus"></i>
          </div>
        </div>
      </div>
    `;

    productsContainer.appendChild(item);
  });

  const totalPrice = totalProductsPrice + SHIPPING_COST;

  const pay = document.createElement("div");
  pay.classList.add("pay");

  pay.innerHTML = `
    <h4>جزئیات خرید</h4>

    <div class="price">

      <div>
        <p>مجموع قیمت کالاها</p>
        <span>${totalProductsPrice.toLocaleString()}</span>
      </div>

      <div>
        <p>هزینه‌ی ارسال</p>
        <span>${SHIPPING_COST.toLocaleString()}</span>
      </div>

      <div>
        <p>مجموع</p>
        <span>${totalPrice.toLocaleString()}</span>
      </div>

    </div>

    <button>ادامه</button>
  `;

  main.appendChild(productsContainer);
  main.appendChild(pay);
}

start();
