const form = document.querySelector("#productForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch("http://localhost:3000/api/product/createProduct", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error(error);
  }
});
