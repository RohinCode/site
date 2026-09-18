const token = localStorage.getItem("disjiRohinToken");
const domin = "http://localhost:3000";
async function getSuggestProducts() {
  const productsContainer = document.querySelector(
    ".offer-product-section .row",
  );

  try {
    const response = await fetch(`${domin}/api/product/OfferProducts`);

    if (response.ok) {
      const result = await response.json();
      const data = result.data;
      const main = document.querySelector("main");
      const suggest = document.createElement("div");
      suggest.id = "subTitle";
      suggest.innerHTML = "اجناس پیشهادی";
      main.insertBefore(suggest, productsContainer.parentElement);
      data.forEach((product) => {
        const col = document.createElement("div");
        col.classList.add("col-lg-3", "col-md-4", "col-sm-6", "col-xs-12");
        productsContainer.appendChild(col);
        const shoppingCard = document.createElement("div");
        shoppingCard.classList.add("shopping-card");
        col.appendChild(shoppingCard);
        createProductCart(product, shoppingCard);
      });
    } else {
      console.log("no");
    }
  } catch (error) {
    console.log(error);
  }
}

function createCategorySection(data, title, category) {
  const main = document.querySelector("main");

  const section = document.createElement("section");
  section.classList.add("dragble-list");
  main.appendChild(section);

  const catgoryTitleBox = document.createElement("div");
  catgoryTitleBox.classList.add("title");
  section.appendChild(catgoryTitleBox);

  const catgoryTitle = document.createElement("h3");
  catgoryTitle.textContent = title;
  catgoryTitle.id = category;
  catgoryTitleBox.appendChild(catgoryTitle);

  const mother = document.createElement("div");
  mother.classList.add("owl-carousel", "owl-product", "owl-theme");

  section.appendChild(mother);

  data.forEach((product) => {
    const owlProduct = mother;

    const cartItem = document.createElement("div");
    cartItem.classList.add("item");

    owlProduct.appendChild(cartItem);

    const shoppingCard = document.createElement("div");
    shoppingCard.classList.add("shopping-card");

    cartItem.appendChild(shoppingCard);

    createProductCart(product, shoppingCard);

    $(document).ready(function () {
      var owl = $(".owl-product");

      owl.owlCarousel({
        items: 1, //10 items above 1000px browser width
        responsive: {
          480: { items: 1 },
          768: { items: 2 },
          1024: { items: 3 },
          1200: { items: 4 },
        },
      });
    });
  });
}

function createProductCart(product, shoppingCard) {
  const imgSec = document.createElement("div");
  imgSec.classList.add("img-sec");
  shoppingCard.appendChild(imgSec);
  const imgProduct = document.createElement("img");
  imgProduct.src = product.img;
  imgProduct.loading = "lazy";
  imgSec.appendChild(imgProduct);

  if (product.hotOffer) {
    const hotOffer = document.createElement("span");
    hotOffer.classList.add("hot-offer");
    hotOffer.innerHTML = "پیشنهاد ویژه";
    imgSec.appendChild(hotOffer);
  }

  const starBox = document.createElement("div");
  starBox.classList.add("stars");
  imgSec.appendChild(starBox);

  for (let i = 0; i < product.star; i++) {
    starIcon = document.createElement("i");
    starIcon.classList.add("fas", "fa-star");
    starBox.appendChild(starIcon);
  }
  const title = document.createElement("h3");
  title.classList.add("title");
  title.innerHTML = product.name;
  shoppingCard.appendChild(title);

  const buttons = document.createElement("div");
  buttons.classList.add("buttons");
  shoppingCard.appendChild(buttons);

  const right = document.createElement("div");
  right.classList.add("right");
  buttons.appendChild(right);

  const price = document.createElement("span");
  price.classList.add("price");
  price.innerHTML = product.price;
  right.appendChild(price);

  const left = document.createElement("div");
  left.classList.add("left");
  buttons.appendChild(left);

  const extendBtn = document.createElement("div");
  extendBtn.classList.add("extend-btn");
  extendBtn.innerHTML = `
        <div class="b-icon">
          <i class="fas fa-shopping-cart"></i>
        </div>
        <div class="b-text" >خرید </div>`;
  left.appendChild(extendBtn);
  extendBtn.addEventListener("click", async () => {
    try {
      const response = await fetch(`${domin}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          productId: product._id,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.message);
        setInterval(() => {
          extendBtn.innerHTML = `
      <div class="b-icon">
        <i class="fas fa-shopping-cart"></i>
      </div>
      <div class="b-text">قبلا اضافه شده</div>`;
        }, 100);
        return;
      }
      setInterval(() => {
        extendBtn.innerHTML = `
      <div class="b-icon">
        <i class="fas fa-shopping-cart"></i>
      </div>
      <div class="b-text" >اضافه شد</div>`;
      }, 100);

      console.log("محصول با موفقیت به سبد اضافه شد");
    } catch (error) {
      console.log(error);
      if (!token) {
        shoppingCard.innerHTML = "برای سفارش باید وارد شوید";
      }
    }
  });
}

async function getCategoryProducts(category, title) {
  try {
    const response = await fetch(`${domin}/api/product/${category}`);

    if (!response.ok) {
      console.log("no");
      return;
    }

    const result = await response.json();
    const data = result.data;
    createCategorySection(data, title, category);
  } catch (error) {
    console.log(error);
  }
}

getSuggestProducts();
getCategoryProducts("handsfree", "دستـه بـندی هنذفری");
getCategoryProducts("laptop", "دستـه بـندی لپ‌تاپ");
getCategoryProducts("headset", "دستـه بـندی هدست");
getCategoryProducts("airpod", "دستـه بـندی ایرپاد");
