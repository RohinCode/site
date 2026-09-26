const main = document.querySelector("main");
const domin = "http://localhost:3000";

async function myInfo() {
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

    main.innerHTML = `
          <aside class="profile-menu">
        <div class="profile-user">
          <div class="profile-avatar">
            <i class="fa-solid fa-user"></i>
          </div>

          <h3>${result.data.name}</h3>
          <span>${result.data.isadmin ? "ادمین" : "کاربر عادی"}</span>
        </div>

        <nav>
          <button class="profile-menu-item changeable active" data-page="profile">
            <i class="fa-solid fa-user"></i>
            پروفایل
          </button>

          <button class="profile-menu-item changeable" data-page="cart">
            <i class="fa-solid fa-box"></i>
            سفارش‌های من
          </button>
          <button class="profile-menu-item logout">
            <i class="fa-solid fa-right-from-bracket"></i>
            خروج از حساب
          </button>
        </nav>
      </aside>

      <section class="profile-content">

        <div class="account-card">
          <div class="card-title">
            <h2>اطلاعات حساب</h2>

            <div>
              <button id="edit">
                <i class="fa-solid fa-pen"></i>
                ویرایش
              </button>

              <button id="save" style="display: none;">
                <i class="fa-solid fa-floppy-disk"></i>
                ذخیره
              </button>
            </div>
          </div>

          <div class="account-info">
            <div>
              <span>نام</span>
              <strong>${result.data.name}</strong>
            </div>

            <div>
              <span>شماره تلفن</span>
              <strong id="number">${result.data.phoneNamber || "00000000000"}</strong>
            </div>

            <div>
              <span>ایمیل</span>
              <strong >${result.data.email}</strong>
            </div>
            <div>
              <span>آدرس</span>
              <strong id="address">${result.data.address || "Iran"}</strong>
            </div>
          </div>
        </div>

      </section>
    `;

    const edit = document.querySelector("#edit");
    const logout = document.querySelector(".logout");
    logout.addEventListener("click", (e) => {
      localStorage.removeItem("disjiRohinToken");
      window.location.href = "/";
    });
    const save = document.querySelector("#save");

    const number = document.querySelector("#number");
    const address = document.querySelector("#address");
    const oldNumber = number.textContent;
    const oldAddress = address.textContent;
    number.addEventListener("input", checkChanges);
    address.addEventListener("input", checkChanges);
    edit.addEventListener("click", () => {
      number.contentEditable = "true";
      address.contentEditable = "true";

      number.focus();
    });

    function checkChanges() {
      const phone = number.textContent.trim();

      const isPhoneValid = /^09\d{9}$/.test(phone);

      const hasChanged =
        phone !== oldNumber || address.textContent !== oldAddress;

      if (hasChanged && isPhoneValid) {
        save.style.display = "block";
      } else {
        save.style.display = "none";
      }
    }

    save.addEventListener("click", async () => {
      try {
        const response = await fetch(`${domin}/api/user/editInfo`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify({
            phoneNamber: number.textContent,
            address: address.textContent,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          console.log(result);
          return;
        }
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    });

    accountCard = document.querySelector(".account-card");

    items = document.querySelectorAll(".changeable");

    items.forEach((item) => {
      item.addEventListener("click", () => {
        const page = item.dataset.page;

        setActiveItem(item);
        changePage(page, accountCard);
      });
    });
  } catch (error) {
    console.log(error);
  }
}

function setActiveItem(activeItem) {
  items.forEach((item) => {
    item.classList.remove("active");
  });

  activeItem.classList.add("active");
}

function changePage(page, accountCard) {
  if (page === "profile") {
    myInfo();
    return;
  }

  if (page === "cart") {
    showMyCart(accountCard);
    return;
  }
}

async function showMyCart(accountCard) {
  try {
    const response = await fetch(`${domin}/api/cart/myCart`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      if (response.status === 400) {
        accountCard.innerHTML =`
          <div class="empty-orders">

            <div class="empty-orders-icon">
              <i class="fa-solid fa-box-open"></i>
            </div>

            <h2>هنوز سفارشی نداری!</h2>

            <p>
              محصولی که دوست داری رو انتخاب کن و
              اولین سفارشت رو ثبت کن.
            </p>

            <a href="/" class="empty-orders-btn">
              <i class="fa-solid fa-bag-shopping"></i>
              رفتن به فروشگاه
            </a>

          </div>
        `;

        return;
      }

      console.log(result);
      return;
    }

    const orders = result.data;

    if (!orders || orders.length === 0) {
      accountCard.innerHTML =`
        <div class="empty-orders">

          <div class="empty-orders-icon">
            <i class="fa-solid fa-box-open"></i>
          </div>

          <h2>هنوز سفارشی نداری!</h2>

          <p>
            هنوز هیچ سفارشی ثبت نکردی.
            محصولات مورد علاقه‌ات منتظر تو هستند.
          </p>

          <a href="/" class="empty-orders-btn">
            <i class="fa-solid fa-bag-shopping"></i>
            مشاهده محصولات
          </a>

        </div>
      `;

      return;
    }

    accountCard.innerHTML =`
      <div class="orders-header">

        <div>
          <span class="orders-small-title">
            سفارش‌های من
          </span>

          <h2>
            سفارش‌های شما
          </h2>
        </div>

        <div class="orders-count">
          <i class="fa-solid fa-box"></i>
          <span>${orders.length} سفارش</span>
        </div>

      </div>

      <div class="orders-list">

        ${orders.map((order, orderIndex) => {

          const products = order.products || [];

          return`
            <div class="order-card">

              <div class="order-card-header">

                <div class="order-number">
                  <div class="order-number-icon">
                    <i class="fa-solid fa-receipt"></i>
                  </div>

                  <div>
                    <span>سفارش</span>
                    <strong>#${orderIndex + 1}</strong>
                  </div>
                </div>

                <div class="delivery-status ${order.isDelivered ? "delivered" : "waiting"}">

                  <i class="fa-solid ${
                    order.isDelivered
                      ? "fa-circle-check"
                      : "fa-clock"
                  }"></i>

                  ${
                    order.isDelivered
                      ? "تحویل داده شده"
                      : "در انتظار ارسال"
                  }

                </div>

              </div>


              <div class="order-products">

                ${products.map(item => {

                  const product = item.productId;

                  if (!product) {
                    return`
                      <div class="deleted-product">
                        <i class="fa-solid fa-box"></i>
                        اطلاعات این محصول دیگر موجود نیست.
                      </div>
                    `;
                  }

                  return `
                    <div class="order-product">

                      <div class="product-image">
                        <img
                          src="${product.img}"
                          alt="${product.name}"
                        >
                      </div>


                      <div class="product-info">

                        <h3>${product.name}</h3>

                        <div class="product-category">
                          <i class="fa-solid fa-tag"></i>
                          ${product.category || "بدون دسته‌بندی"}
                        </div><div class="product-rating">

                          <span>
                            ${product.star || 0}
                          </span>

                          <i class="fa-solid fa-star"></i>

                        </div>

                      </div>


                      <div class="product-details">

                        <div>
                          <span>تعداد</span>
                          <strong>
                            ${item.quantity}
                          </strong>
                        </div>

                        <div>
                          <span>قیمت</span>
                          <strong>
                            ${product.price}
                          </strong>
                        </div>

                      </div>

                    </div>
                  `;
                }).join("")}

              </div>


              <div class="order-footer">

                <div class="order-total">

                  <span>مبلغ کل سفارش</span>

                  <strong>
                    ${Number(order.totalPrice).toLocaleString("fa-IR")}
                    <small>تومان</small>
                  </strong>

                </div>

                <div class="order-id">
                  <span>شناسه سفارش</span>
                  <strong>${order._id}</strong>
                </div>

              </div>

            </div>
          `;
        }).join("")}

      </div>
    `;

  } catch (error) {
    console.log(error);

    accountCard.innerHTML =`
      <div class="orders-error">

        <div>
          <i class="fa-solid fa-triangle-exclamation"></i>
        </div>

        <h2>مشکلی پیش آمد</h2>

        <p>
          دریافت سفارش‌ها با مشکل مواجه شد.
          لطفاً دوباره تلاش کن.
        </p>

        <button onclick="showMyCart(document.querySelector('.account-card'))">
          <i class="fa-solid fa-rotate-right"></i>
          تلاش دوباره
        </button>

      </div>
    `;
  }
}

myInfo();
