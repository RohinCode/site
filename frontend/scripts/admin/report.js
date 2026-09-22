import { left, domin } from "./changeItem.js";
import { token } from "./admin.js";

export async function showReports() {
  try {
    const response = await fetch(`${domin}/api/report`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      if (response.status === 400) {
        return (left.innerHTML = `<h1>گزارش‌ها</h1>
        <p>گزارشی نداریم</p>`);
      }
      console.log(result);
      return;
    }

    console.log(result);
    const totalSales = result.data.reduce((total, report) => {
      return total + report.quantity;
    }, 0);
    left.innerHTML = `<section class="reports-page">

  <div class="reports-header">
    <div>
      <h2>گزارش‌ها</h2>
      <p>گزارش فروش محصولات</p>
    </div>

    <div class="reports-total">
      <span>مجموع فروش</span>
      <strong>${totalSales.toLocaleString("fa-IR")} عدد</strong>
    </div>
  </div>


  <div class="reports-list">

  ${result.data
    .map((product) => {
      return `<article class="report-card">
       <div class="report-icon">
            <i class="fa-solid fa-layer-group"></i>
        </div>

        <div class="report-info">
          <h3>${product.category}</h3>
          <span>دسته‌بندی محصول</span>
        </div>

        <div class="report-quantity">
          <strong>${product.quantity.toLocaleString("fa-IR")}</strong>
          <span>فروش</span>
        </div>
        </article>`;
    })
    .join(" ")}


  </div>

  <button id="refresh">حذف این گزارشات</button>
</section>`;

    document.querySelector("#refresh").addEventListener("click", async () => {
      try {
        const response = await fetch(`${domin}/api/report`, {
          method: "DELETE",
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

        window.location.reload();
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export function showSupport() {
  left.innerHTML = `
    <section class="support">

      <h2>
        <i class="fa-solid fa-headset"></i>
        پشتیبانی
      </h2>

      <p>
        اگر مشکلی در سایت داشتید به من پیام دهید
      </p>

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

    </section>
  `;
}
