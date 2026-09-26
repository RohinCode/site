const token = localStorage.getItem("disjiRohinToken");
const domin = "http://localhost:3000";

async function getSuggestProducts() {
  const productsContainer = document.querySelector(
    ".offer-product-section .row",
  );

  try {
    const response = await fetch(`${domin}/api/product/OfferProducts`);
    const result = await response.json();

    if (response.ok) {
      const data = result.data;

      const main = document.querySelector("main");

      const suggest = document.createElement("div");
      suggest.id = "subTitle";
      suggest.innerHTML = "اجناس پیشنهادی";

      main.insertBefore(suggest, productsContainer.parentElement);

      data.forEach((product) => {
        const col = document.createElement("div");

        col.classList.add("col-lg-3", "col-md-4", "col-sm-6", "col-xs-12");

        productsContainer.appendChild(col);

        const shoppingCard = document.createElement("div");
        shoppingCard.classList.add("shopping-card");

        col.appendChild(shoppingCard);

        createProductCart(product, shoppingCard);
      });
    } else {
      console.log(result);

      document.querySelector(".offer-product-section").style.display = "none";
    }
  } catch (error) {
    console.log(error);
  }
}

function createCategorySection(data, title, category) {
  const main = document.querySelector("main");

  const section = document.createElement("section");
  section.classList.add("dragble-list");

  main.appendChild(section);

  const categoryTitleBox = document.createElement("div");
  categoryTitleBox.classList.add("title");

  categoryTitleBox.innerHTML = `<h3 id="${category}">${title}</h3>
  `;

  section.appendChild(categoryTitleBox);

  const mother = document.createElement("div");

  mother.classList.add("owl-carousel", "owl-product", "owl-theme");

  section.appendChild(mother);

  data.forEach((product) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("item");

    mother.appendChild(cartItem);

    const shoppingCard = document.createElement("div");
    shoppingCard.classList.add("shopping-card");

    cartItem.appendChild(shoppingCard);

    createProductCart(product, shoppingCard);
  });

  // راه‌اندازی کاروسل فقط یک بار
  $(document).ready(function () {
    const owl = $(mother);

    owl.owlCarousel({
      items: 1,
      responsive: {
        480: {
          items: 1,
        },

        768: {
          items: 2,
        },

        1024: {
          items: 3,
        },

        1200: {
          items: 4,
        },
      },
    });
  });
}

function createProductCart(product, shoppingCard) {
  const LOW_STOCK_THRESHOLD = 4;
  shoppingCard.innerHTML = `
  <div class="hiddenDetails">
   ${product.hotOffer ? `<span class="hot-offer">پیشنهاد ویژه</span>` : ""}
  <div class="stars"></div>
      <h3 class="detailsTitle">${product.name}</h3>
      <p>${product.details ? `${product.details}</p>` : "این محصول جزئیات ندارد"}
       ${
      product.quantity < LOW_STOCK_THRESHOLD
        ? `<h4 class="quantity low-stock">فقط ${product.quantity} عدد باقی مانده</h4>`
        : `<h4 class="quantity">${product.quantity} عدد در انبار موجود است</h4>`
    }
  <div class="extend-btn back">
            <span class="b-text">برگشت</span>
            <span class="b-icon">
              <i class="fa-solid fa-arrow-left"></i>
            </span>
        </div>
  </div>
  <div class="contact">
    <div class="img-sec">
      <img src="${product.img}" alt="${product.name}" />
      ${product.hotOffer ? `<span class="hot-offer">پیشنهاد ویژه</span>` : ""}
      <div class="stars"></div>
    </div>
    <div class="title">
      <h3>${product.name}</h3>
    </div>

    ${
      product.quantity < LOW_STOCK_THRESHOLD
        ? `<h4 class="quantity low-stock">فقط ${product.quantity} عدد باقی مانده</h4>`
        : `<h4 class="quantity">${product.quantity} عدد در انبار موجود است</h4>`
    }

    <div class="buttons">
      <div class="right">
        <span class="price">
          ${product.price} <span>تومان</span>
        </span>
      </div>

      <div class="left">
        <div class="extend-btn buy">
            <span class="b-text">خرید</span>
            <span class="b-icon">
              <i class="fas fa-shopping-cart"></i>
            </span>
        </div>
        <div class="extend-btn details">
            <span class="b-text">جزئیات</span>
            <span class="b-icon">
              <i class="fa-solid fa-circle-info"></i>
            </span>
        </div>
      </div>
    </div>
  </div>`;

  // ستاره‌ها
  const starBox = shoppingCard.querySelectorAll(".stars");
  starBox.forEach((s) => {
    for (let i = 0; i < product.star; i++) {
      s.innerHTML += `<i class="fas fa-star"></i>`;
    }
  });

  // دکمه خرید همین محصول
  const buyBtn = shoppingCard.querySelector(".buy");

  buyBtn.addEventListener("click", async () => {
    try {
      const response = await fetch(`${domin}/api/cart/add`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          productId: product._id,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.message);

        setTimeout(() => {
          buyBtn.innerHTML = `
              <span class="b-text">قبلاً اضافه شده</span>
              <span class="b-icon">
              <i class="fas fa-shopping-cart"></i>
              </span>
              `;
        }, 300);

        return;
      }

      setTimeout(() => {
        buyBtn.innerHTML = `
            <span class="b-text">اضافه شد</span>
            <span class="b-icon">
                  <i class="fas fa-shopping-cart"></i>
              </span>
        `;
      }, 300);

      console.log("محصول با موفقیت به سبد اضافه شد");
    } catch (error) {
      console.log(error);
      if (!token) {
        shoppingCard.innerHTML = "برای سفارش باید وارد شوید";
      }
    }
  });

  const details = shoppingCard.querySelector(".details");
  const back = shoppingCard.querySelector(".back");

  let originalHeight;

  details.addEventListener("click", () => {
    if (!originalHeight) {
      originalHeight = shoppingCard.offsetHeight;
    }

    setTimeout(() => {
      shoppingCard.querySelector(".hiddenDetails").style.display = "block";
      shoppingCard.querySelector(".contact").style.display = "none";

      shoppingCard.style.height = `${originalHeight}px`;
    }, 300);
  });

  back.addEventListener("click", () => {
    setTimeout(() => {
      shoppingCard.querySelector(".hiddenDetails").style.display = "none";
      shoppingCard.querySelector(".contact").style.display = "block";

      shoppingCard.style.height = `${originalHeight}px`;
    }, 300);
  });
}


// ===== رندر کارت محصول — نسخه حرفه‌ای =====
// منطق fetch / سبد خرید دست‌نخورده باقی مونده، فقط ظاهر و ساختار به‌روز شده

function renderShoppingCard(product, shoppingCard) {
  const LOW_STOCK_THRESHOLD = 5; // زیر این عدد، هشدار موجودی نشون داده میشه

  shoppingCard.innerHTML =`
  <div class="hiddenDetails">
    ${product.hotOffer ? `<span class="hot-offer">پیشنهاد ویژه</span>` : ""}
    <div class="stars"></div>
    <h3 class="detailsTitle">${product.name}</h3>
    <p>${product.details ? product.details : "این محصول جزئیات ندارد"}</p>
    <h4 class="quantity ${product.quantity < LOW_STOCK_THRESHOLD ? "low-stock" : ""}">
      ${product.quantity < LOW_STOCK_THRESHOLD ?` فقط ${product.quantity} عدد باقی مانده` : ""}
    </h4>
    <div class="extend-btn back">
      <span class="b-text">برگشت</span>
      <span class="b-icon"><i class="fa-solid fa-arrow-left"></i></span>
    </div>
  </div>

  <div class="contact">
    <div class="img-sec">
      <img src="${product.img}" alt="${product.name}" />
      ${product.hotOffer ? `<span class="hot-offer">پیشنهاد ویژه</span>` : ""}
      <div class="stars"></div>
    </div>

    <div class="title">
      <h3>${product.name}</h3>
    </div>

    ${
      product.quantity < LOW_STOCK_THRESHOLD
        ? `<h4 class="quantity low-stock">فقط ${product.quantity} عدد باقی مانده</h4>`
        : ""
    }

    <div class="buttons">
      <div class="right">
        <span class="price">${product.price}</span>
      </div>
      <div class="left">
        <div class="extend-btn buy">
          <span class="b-text">خرید</span>
          <span class="b-icon"><i class="fas fa-shopping-cart"></i></span>
        </div>
        <div class="extend-btn details">
          <span class="b-text">جزئیات</span>
          <span class="b-icon"><i class="fa-solid fa-circle-info"></i></span>
        </div>
      </div>
    </div>
  </div>`;

  // ستاره‌ها
  const starBox = shoppingCard.querySelectorAll(".stars");
  starBox.forEach((s) => {
    for (let i = 0; i < product.star; i++) {
      s.innerHTML += `<i class="fas fa-star"></i>`;
    }
  });

  // دکمه خرید همین محصول
  const buyBtn = shoppingCard.querySelector(".buy");

  buyBtn.addEventListener("click", async () => {
    try {
      const response = await fetch(`${domin}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ productId: product._id }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.message);
        setTimeout(() => {
          buyBtn.innerHTML =
            `<span class="b-text">قبلاً اضافه شده</span>`
            `<span class="b-icon"><i class="fas fa-shopping-cart"></i></span>`;
        }, 300);
        return;
      }

      setTimeout(() => {
        buyBtn.innerHTML =
          `<span class="b-text">اضافه شد</span>`
          `<span class="b-icon"><i class="fas fa-shopping-cart"></i></span>`;
      }, 300);

      console.log("محصول با موفقیت به سبد اضافه شد");
    } catch (error) {
      console.log(error);
      if (!token) {
        shoppingCard.innerHTML = "برای سفارش باید وارد شوید";
      }
    }
  });

  // نمایش / بازگشت از جزئیات
  const details = shoppingCard.querySelector(".details");
  const back = shoppingCard.querySelector(".back");
  let originalHeight;

  details.addEventListener("click", () => {
    if (!originalHeight) originalHeight = shoppingCard.offsetHeight;
    setTimeout(() => {
      shoppingCard.querySelector(".hiddenDetails").style.display = "block";
      shoppingCard.querySelector(".contact").style.display = "none";
      shoppingCard.style.height = `${originalHeight}px`;
    }, 300);
  });

  back.addEventListener("click", () => {
    setTimeout(() => {
      shoppingCard.querySelector(".hiddenDetails").style.display = "none";
      shoppingCard.querySelector(".contact").style.display = "block";
      shoppingCard.style.height = `${originalHeight}px`;
    }, 300);
  });
}


async function getCategoryProducts(category, title) {
  try {
    const response = await fetch(`${domin}/api/product/${category}`);

    if (!response.ok) {
      const result = await response.json();
      console.log(result);
      return;
    }

    const result = await response.json();

    const data = result.data;

    createCategorySection(data, title, category);
  } catch (error) {
    console.log(error);
  }
}

getSuggestProducts();

getCategoryProducts("handsfree", "دستـه بـندی هنذفری");

getCategoryProducts("laptop", "دستـه بـندی لپ‌تاپ");

getCategoryProducts("headset", "دستـه بـندی هدست");

getCategoryProducts("airpod", "دستـه بـندی ایرپاد");
getCategoryProducts("mobile", "دستـه بـندی موبایل");
