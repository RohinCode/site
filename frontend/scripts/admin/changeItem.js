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

    // تغییر محتوای بخش چپ
    if (page === "add-product") {
      left.innerHTML = `
                <div class="explain">
          <h3>چیزهایی که باید قبل از ایجاد محصول بدانید</h3>

          <ul>
            <li>حتما باید تمام ورودی‌ها را پر کنید</li>
            <li>مطمئن باشید که محصول وارد شده را در انبار دارید</li>
            <li>
              تصویر محصول باید با فرمت webp، jpg یا png باشد. پیشنهاد می‌کنیم که
              از فرمت webp استفاده کنید
            </li>
            <li>تصویر انتخاب‌شده باید مربوط به همان محصول باشد.</li>
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
            value="انتخاب تصویر"
            name="img"
            accept=".webp,.jpg,.png"
            required
          />
          <input type="submit" value="ثبت محصول" />
        </form>
      `;
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
      left.innerHTML = `<h2>پشتیبانی</h2>

        <p>اینجا بخش پشتیبانی قرار می‌گیرد.</p>
      `;
    }
  });
});
