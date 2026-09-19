const items = document.querySelectorAll(".menu-btns .item");
const left = document.querySelector(".left");

items.forEach((item) => {
  item.addEventListener("click", () => {
    const page = item.dataset.page;

    // تغییر آیتم فعال
    items.forEach((item) => {
      item.classList.remove("item-active");
    });

    item.classList.add("item-active");

    if (page === "profile") {
      left.innerHTML = `
        <section class="adminProfile">
          <h1>
            ${localStorage.getItem("AdminName")}
          </h1>

          <p>
            این صفحه برای کنترل و مدیریت سایت هست و فقط ادمین‌ها می‌تونن واردش
            بشن.
            <br />
            از اینجا می‌تونی بخش‌های مختلف سایت رو مدیریت کنی:
          </p>

          <ul>
            <li>
              <i class="fa-solid fa-box"></i>
              <span>اضافه، ویرایش و حذف محصول</span>
            </li>

            <li>
              <i class="fa-solid fa-layer-group"></i>
              <span>انتخاب دسته‌بندی‌ها برای نمایش</span>
            </li>

            <li>
              <i class="fa-solid fa-cart-shopping"></i>
              <span>دیدن سفارش‌های ثبت‌شده</span>
            </li>

            <li>
              <i class="fa-solid fa-message"></i>
              <span>گزارش‌های دریافتی (دیدن پیام‌های کاربران)</span>
            </li>

            <li>
              <i class="fa-solid fa-headset"></i>
              <span>پشتیبانی (تماس با من)</span>
            </li>
          </ul>
        </section>`;
    }
    // صفحه ایجاد محصول
    if (page === "add-product") {
      left.innerHTML = `
        <div class="explain">
          <h3>چیزهایی که باید قبل از ایجاد محصول بدانید</h3>

          <ul>
            <li>حتما باید تمام ورودی‌ها را پر کنید</li>
            <li>مطمئن باشید که محصول وارد شده را در انبار دارید</li>
            <li>
              تصویر محصول باید با فرمت webp، jpg یا png باشد.
              پیشنهاد می‌کنیم از فرمت webp استفاده کنید
            </li>
            <li>تصویر انتخاب‌شده باید مربوط به همان محصول باشد.</li>
            <li>امتیاز محصول نباید بیشتر از 6 باشد</li>
            <li>قبل از ثبت، اطلاعات محصول را بررسی کنید.</li>
          </ul>
        </div>

        <form id="productForm">
          <input
            name="name"
            type="text"
            placeholder="نام محصول را وارد کنید"
            required
          />

          <input
            name="star"
            type="number"
            placeholder="امتیاز محصول را وارد کنید"
            min="0"
            max="6"
            step="1"
            required
          />

          <input
            name="price"
            type="text"
            placeholder="قیمت محصول را وارد کنید"
            required
          />

          <input
            name="category"
            type="text"
            placeholder="دسته بندی را وارد کنید"
            required
          />

          <label>
            <input type="checkbox" name="hotOffer" />
            آیا این محصول پیشنهاد ویژه است؟
          </label>

          <label>
            <input type="checkbox" name="isSuggest" />
            آیا این محصول در بخش پیشنهادات قرار بگیرد؟
          </label>

          <p style="margin: 0 auto">آپلود تصویر:</p>

          <input
            type="file"
            name="img"
            accept=".webp,.jpg,.png"
            required
          />

          <input type="submit" value="ثبت محصول" />
        </form>

        <div class="category">
          <h3>انتخاب کردن دسته بندی برای نمایش</h3>

          <div class="row"></div>

          <div>
            <input
              type="text"
              id="writeItem"
              placeholder="اضافه کردن دسته‌بندی جدید"
            />

            <button type="button" id="addItems">
              اضافه کردن
            </button>
          </div>

          <button type="button">تایید</button>
        </div>
      `;

      // فرم ایجاد محصول
      const form = document.querySelector("#productForm");

      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        console.log("ok");

        const formData = new FormData(form);

        try {
          const response = await fetch(
            "http://localhost:3000/api/product/createProduct",
            {
              method: "POST",
              headers: {
                "x-auth-token": token,
              },
              body: formData,
            },
          );

          const data = await response.json();

          console.log(data);
        } catch (error) {
          console.error(error);
        }
      });

      // اضافه کردن دسته‌بندی
      const addItems = document.querySelector("#addItems");
      const writeItem = document.querySelector("#writeItem");
      const row = document.querySelector(".row");

      addItems.addEventListener("click", () => {
        if (writeItem.value.trim() === "") return;

        const label = document.createElement("label");

        label.classList.add("col-lg-3", "col-md-4", "col-sm-4", "col-xs-6");

        const inp = document.createElement("input");
        inp.type = "checkbox";
        const p = document.createElement("p");
        p.innerText = writeItem.value;

        writeItem.value = "";

        label.appendChild(inp);
        label.appendChild(p);

        row.appendChild(label);
      });
    }
    if (page === "orders") {
      left.innerHTML = `<h2>سفارش‌ها</h2>

        <p>اینجا سفارش‌های کاربران نمایش داده می‌شود.</p>
      `;
    }

    if (page === "reports") {
      left.innerHTML = ` <h2>گزارش‌ها</h2>

        <p>اینجا گزارش‌های فروش نمایش داده می‌شود.</p>
        `;
    }

    if (page === "support") {
      left.innerHTML = `<section class="support">
  <h2>
    <i class="fa-solid fa-headset"></i>
    پشتیبانی
  </h2>
  <p>اگر مشکلی در سایت داشتید به من پیام دهید</p>
  <p>
    بهترین راه برای ارتباط با من، از طریق ربات تلگرام است.
  </p>

  <a
    class="telegram-link"
    href="https://t.me/RohinCodeBot"
    target="_blank"
  >
    <i class="fa-brands fa-telegram"></i>
    ارتباط با من در تلگرام
  </a>
</section>`;
    }
  });
});
