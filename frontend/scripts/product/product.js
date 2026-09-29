const id = window.location.pathname.split("/").pop();
const productPage = document.querySelector("main");
const token = localStorage.getItem("disjiRohinToken");
console.log(id);

async function getProduct() {
  try {
    const response = await fetch(
      `http://localhost:3000/api/product/getProduct/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

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
      </div>

  `;

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
      const response = await fetch(`http://localhost:3000/api/cart/add`, {
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

getProduct();
