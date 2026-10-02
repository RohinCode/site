const id = window.location.pathname.split("/").pop();
const productPage = document.querySelector("main");
const token = localStorage.getItem("disjiRohinToken");
const domain = window.location.origin;

async function getProduct() {
  try {
    const response = await fetch(`${domain}/api/product/getProduct/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result);
      return;
    }
    console.log(result);

    createProductPage(result.data);
  } catch (error) {
    console.log(error);
  }
}

function createProductPage(data) {
  document.title = data.name;
  productPage.innerHTML = `
        <div class="product-image">
          <img src="${data.img}" alt="${data.name}" />
        </div>

      <div class="product-info">
        <h1 class="product-title">${data.name}</h1>
        <div class="product-rating"></div>
        <div class="product-details">
          ${data.details ? data.details : "این محصول جزئیات ندارد"}
        </div>

        <div class="product-price">
          <span>${priceToNumber(data.price).toLocaleString()}</span><span> تومان</span>
        </div>

        <div class="quantity">
            <p>${data.quantity} عدد موجود است</p>
          </div>

        <div class="product-actions">
          <button class="add-to-cart">افزودن به سبد خرید</button>
        </div>
        <div class="youShouldLoginned">
          <h4>
          <i class="fa-solid fa-circle-info"></i>
           برای افزودن به سبد خرید باید وارد شوید برای ورود
           <a href="/login">اینجا</a>
            کلیک کنید
          </h4>
        </div>
        <div class="ok">
          <h4>به سبد خرید اضافه شد</h4>
        </div>

        <div class="comments">
        <h3>نظرات کاربران</h3>

        </div>

        <div class="writeComment">
          <form>
            <textarea
              name="comment"
              placeholder="نظر خود را بنویسید..."
              maxlength="500"
            ></textarea>

            <div class="commentActions">
              <span>حداکثر ۵۰۰ کاراکتر</span>
              <button type="submit">ارسال نظر</button>
            </div>
          </form>
        </div>

          <div class="youShouldLoginned">
          <h4>
           <i class="fa-solid fa-circle-info"></i>
            برای نوشتن کامنت باید وارد شوید برای ورود
            <a href="/login">اینجا</a>
             کلیک کنید
           </h4>
          </div>
      </div>

  `;
  const form = document.querySelector("form");
  form.addEventListener("submit", async (e) => {
    // e.preventDefault();
    const text = document.querySelector("textarea");
    console.log(text);

    if (!token) {
      document.querySelectorAll(".youShouldLoginned")[1].style.display =
        "block";
      return;
    }

    if (text.value.trim() === "") {
      return;
    }

    try {
      const response = await fetch(`${domain}/api/comment/write`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ productId: id, text: text.value }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.message);

        if (response.status == 401) {
          console.log(result.message);
          return (document.querySelectorAll(
            ".youShouldLoginned",
          )[1].style.display = "block");
        }
        return;
      }
    } catch (error) {
      console.log(error);
    }
  });

  showComments();

  const starBox = document.querySelector(".product-rating");
  for (let i = 0; i < data.star; i++) {
    starBox.innerHTML += `<i class="fas fa-star"></i>`;
  }

  // دکمه خرید همین محصول
  const buyBtn = document.querySelector(".add-to-cart");
  const added = document.querySelector(".ok");

  buyBtn.addEventListener("click", async () => {
    if (!token) {
      document.querySelector(".youShouldLoginned").style.display = "block";
      return;
    }
    try {
      const response = await fetch(`${domain}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ productId: data._id }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.message);

        return;
      }

      console.log(added);

      added.style.display = "block";
    } catch (error) {
      console.log(error);
    }
  });
}

function priceToNumber(price) {
  const normalizedPrice = price
    .replace(/[۰-۹]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
    .replace(/,/g, "")
    .trim();

  const number = parseFloat(normalizedPrice);

  if (normalizedPrice.includes("میلیون")) {
    return number * 1000000;
  }

  if (normalizedPrice.includes("هزار")) {
    return number * 1000;
  }

  return number;
}

async function showComments() {
  try {
    const response = await fetch(`${domain}/api/comment/getComment/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    const comments = document.querySelector(".comments");

    if (!response.ok) {
      if (response.status == 404) {
        comments.style.display = "none";
        return;
      }
      return;
    }

    const commentsHTML = result.data
      .map((comment) => {
        return `<div class="comment">
            <div class="top">
              <div class="userInfo">
                <button>
                  <i class="fa-solid fa-user"></i>
                </button>
                <h3>${comment.user.name}</h3>
              </div>
              <p class="time">${formatMessageDate(comment.date)}</p>
            </div>
            <div class="bottom">
              <p>${comment.text}</p>
            </div>
          </div>`;
      })
      .join("");

    const colors = [
      "#2e56ad",
      "#d32222",
      "#141414",
      "#f7c326",
      "#ee5da6",
      "#1dd762",
      "#f4712a",
    ];
    comments.insertAdjacentHTML("beforeend", commentsHTML);
    document.querySelectorAll(".userInfo button").forEach((button) => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      console.log(button);

      button.style.backgroundColor = randomColor;
    });
    console.log(document.querySelectorAll(".userInfo button"));

  } catch (error) {
    console.log(error);
  }
}


function formatMessageDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const dateDay = date.getDate();
  const dateMonth = date.getMonth();
  const dateYear = date.getFullYear();

  const nowDay = now.getDate();
  const nowMonth = now.getMonth();
  const nowYear = now.getFullYear();

  // ساعت و دقیقه
  const time = date.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // امروز
  if (dateDay === nowDay && dateMonth === nowMonth && dateYear === nowYear) {
    return ` امروز ${time}`;
  }

  // دیروز
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  if (
    dateDay === yesterday.getDate() &&
    dateMonth === yesterday.getMonth() &&
    dateYear === yesterday.getFullYear()
  ) {
    return ` دیروز ${time}`;
  }

  // روزهای قبل
  return `
    date.toLocaleDateString("fa-IR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }) + ، ${time}
  `;
}

getProduct();
