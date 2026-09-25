const form = document.querySelector("#login-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = form.name.value;
  const password = form.password.value;
  const response = await fetch("http://localhost:3000/api/auth/admin-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      password,
    }),
  });

  const result = await response.json();

  if (response.ok) {
    localStorage.setItem("disjiRohinToken", result.data.token);

    window.location.href = "admin";
  } else {
    alert(result.message);
  }
});
