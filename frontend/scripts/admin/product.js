import { left, domin} from "./changeItem.js";
import { token} from "./admin.js";

export default function showAddProduct() {
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

      <button type="button">
        تایید
      </button>

    </div>
`;

  setupProductForm();
  setupCategories();
}

function setupProductForm() {
  const form = document.querySelector("#productForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(
        `${domin}/api/product/createProduct`,
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
}

function setupCategories() {
  const addItems = document.querySelector("#addItems");
  const writeItem = document.querySelector("#writeItem");
  const row = document.querySelector(".row");

  addItems.addEventListener("click", () => {

    if (writeItem.value.trim() === "") {
      return;
    }

    const label = document.createElement("label");

    label.classList.add(
      "col-lg-3",
      "col-md-4",
      "col-sm-4",
      "col-xs-6",
    );

    const input = document.createElement("input");

    input.type = "checkbox";

    const p = document.createElement("p");

    p.innerText = writeItem.value;

    writeItem.value = "";

    label.appendChild(input);
    label.appendChild(p);

    row.appendChild(label);
  });
}