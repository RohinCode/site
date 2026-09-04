const token = localStorage.getItem("disjiRohinToken");
let result;
let Admindata;

async function start() {
  if (!token) {
    return (window.location.href = "./login.html");
  }
  try {
    const response = await fetch("http://localhost:3000/api/user/me", {
      method: "GET",
      headers: {
        "x-auth-token": token,
      },
    });
    if (response.ok) {
      result = await response.text();
      document.body.innerText = result;

      adminOrNot();
    } else {
      localStorage.removeItem("disjiRohinToken");
      window.location.href = "./login.html";
    }
  } catch (error) {
    console.log(error);
  }
}

async function adminOrNot() {
  try {
    const response = await fetch("http://localhost:3000/api/admin", {
      method: "GET",
      headers: {
        "x-auth-token": token,
      },
    });
    if (response.ok) {
      Admindata = await response.text();
      console.log(Admindata);
      document.body.innerText = result;
    }
  } catch (error) {
    console.log(error);
  }
}

start();
