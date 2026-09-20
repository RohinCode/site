
import { left} from "./changeItem.js";

export default function showProfile() {
  left.innerHTML =`
    <section class="adminProfile">

      <h1>
        ${localStorage.getItem("AdminName")}
      </h1>

      <p>
        این صفحه برای کنترل و مدیریت سایت هست و فقط ادمین‌ها
        می‌تونن واردش بشن.
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
          <span>گزارش‌های دریافتی</span>
        </li>

        <li>
          <i class="fa-solid fa-headset"></i>
          <span>پشتیبانی</span>
        </li>
      </ul>

    </section>
  `;
}