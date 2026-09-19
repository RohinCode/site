const token = localStorage.getItem("disjiRohinToken");
const left1 = document.querySelector(".left");

let result;
let Admindata;

async function start() {
  if (!token) {
    return (window.location.href = "./login.html");
  }
  try {
    const response = await fetch("http://localhost:3000/api/admin", {
      method: "GET",
      headers: {
        "x-auth-token": token,
      },
    });
    if (!response.ok) {
      return (window.location.href = "./login.html");
    }
    result = await response.json();
    console.log(result);
    left1.innerHTML = `
        <section class="adminProfile">
          <h1>
            ${result.message}
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
    localStorage.setItem("AdminName", result.message);
  } catch (error) {
    console.log(error);
  }
}

start();
