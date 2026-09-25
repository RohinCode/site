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
        return (left.innerHTML = `
          <div class="empty-reports">
            <svg class="empty-reports-chart" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
              <line x1="14" y1="86" x2="150" y2="86" stroke="#dfe3ea" stroke-width="2" stroke-linecap="round"/>
              <rect x="26" y="66" width="18" height="20" rx="3" fill="#e4e9f2"/>
              <rect x="58" y="50" width="18" height="36" rx="3" fill="#dbe2f0"/>
              <rect x="90" y="34" width="18" height="52" rx="3" fill="#cfd9ee"/>
              <rect x="122" y="58" width="18" height="28" rx="3" fill="#e4e9f2"/>
              <circle cx="99" cy="20" r="13" fill="#0b1b34"/>
              <path d="M93 20l4 4 8-8" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

  <h2>هنوز گزارشی برای نمایش نیست</h2>
  <p>به محض ثبت اولین فروش، آمار محصولات پرفروش و درآمد همین‌جا نمایش داده می‌شه.</p>
</div>
          `);
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

      ${buildReportsChart()}

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
createReportsChart(result.data);

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
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

function buildReportsChart() {
  return`
    <div class="reports-chart-wrap">

      <div class="reports-chart-header">
        <div>
          <h3>فروش بر اساس دسته‌بندی</h3>
          <p>سهم هر دسته از مجموع فروش</p>
        </div>
      </div>

      <div class="reports-chart">
        <canvas id="reportsChart"></canvas>
      </div>

      </div>
      `;
    }

    function createReportsChart(data) {
      const canvas = document.querySelector("#reportsChart");

      if (!canvas) {
        console.log("reportsChart پیدا نشد");
        return;
      }

      const labels = data.map((item) => item.category);
      const values = data.map((item) => item.quantity);

      new Chart(canvas, {
        type: "doughnut",

        data: {
          labels,

          datasets: [
            {
              data: values,

              backgroundColor: [
                "#3d6fae",
                "#f00000",
                "#91ff00",
                "#fbff10",
                "#ec87dc",
                "#390153",
                "#922872",
                "#4bdaf3",
                "#f1880f",
              ],

              borderColor: "#fff",
              borderWidth: 3,

              hoverOffset: 8,
            },
          ],
        },

options: {
  responsive: true,
  maintainAspectRatio: false,

  cutout: "65%",

  plugins: {
    legend: {
      position: window.innerWidth <= 600 ? "bottom" : "right",

      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        padding: 14,

        font: {
          family: "IranSans",
          size: window.innerWidth <= 400 ? 11 : 13
        }
      }
    },

    tooltip: {
      rtl: true,

      callbacks: {
        label: function (context) {
          const value = context.raw;

          return `${value} عدد`;
        }
      }
    }
  }
}
      });
    }
