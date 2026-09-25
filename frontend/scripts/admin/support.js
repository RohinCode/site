import { left} from "./changeItem.js";


export default function showSupport() {
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
