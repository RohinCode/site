import { left } from "./changeItem.js";
import { token, domain } from "./admin.js";

export default function showAddProduct() {
  left.innerHTML = `
    <div class="explain">
      <h3>چیزهایی که باید قبل از ایجاد محصول بدانید</h3>

      <ul>
        <li>حتما باید تمام ورودی‌ها را پر کنید</li>
        <li>مطمئن باشید که محصول وارد شده را در انبار دارید</li>
        <li>امتیاز محصول نباید بیشتر از 6 باشد</li>
        <li>
          تصویر محصول باید با فرمت webp، jpg یا png باشد.
          پیشنهاد می‌کنیم از فرمت webp استفاده کنید
        </li>
        <li>تصویر انتخاب‌شده باید مربوط به همان محصول باشد.</li>
        <li>تصویر انتخاب‌شده حتما و حتما باید 1 در 1 باشد</li>
        <li>پیشنهاد میشه از کلید میان‌بر استفاده کنید تا کاربر راحت‌نر محصول مورد نظر را پیدا کند</li>
        <li>در قسمت میان‌بر بعد از هر گزینه حتما یک نقطه بزارید</li>
        <li>در قسمت میان‌بر از کلمات مربوط به محصول استفاده کنید</li>
        <li>می‌توانید در قسمت جزئیات از html نیز استفاده کنید</li>
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
        name="quantity"
        type="number"
        placeholder="تعداد محصول را وارد کنید"
      />

      <input
        name="category"
        type="text"
        placeholder="دسته بندی را وارد کنید"
        required
      />
      <input
        name="keywords"
        type="text"
        placeholder="کلیدهای میان‌بر برای سرچ رو وارد کنید"
      />

      <textarea name="details"
        placeholder="جزئیات محصول را وارد کنید"
        maxlength="500"></textarea>

      <label>
        <input type="checkbox" name="hotOffer" />
        آیا این محصول پیشنهاد ویژه است؟
      </label>

      <label>
        <input type="checkbox" name="isSuggest" />
        آیا این محصول در بخش پیشنهادات قرار بگیرد؟
      </label>

      <p style="margin: 0 auto">
        آپلود تصویر:
      </p>

      <input
        type="file"
        name="img"
        accept=".webp,.jpg,.png"
        required
      />

      <input
        type="submit"
        value="ثبت محصول"
      />

    </form>

`;

  setupProductForm();
}

function setupProductForm() {
  const form = document.querySelector("#productForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const keywords = formData.get("keywords");

    formData.set(
      "keywords",
      JSON.stringify(
        keywords
          .split(".")
          .map((item) => item.trim())
          .filter(Boolean),
      ),
    );
    try {
      const response = await fetch(`${domain}/api/product/createProduct`, {
        method: "POST",

        headers: {
          "x-auth-token": token,
        },

        body: formData,
      });

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  });
}
