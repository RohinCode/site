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
    console.log(result);

    main.innerHTML = `
          <aside class="profile-menu">
        <div class="profile-user">
          <div class="profile-avatar">
            <i class="fa-solid fa-user"></i>
          </div>

          <h3>${result.data.name}</h3>
          <span>کاربر عادی</span>
        </div>

        <nav>
          <button class="profile-menu-item active">
            <i class="fa-solid fa-user"></i>
            پروفایل
          </button>

          <button class="profile-menu-item">
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
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

myInfo();
