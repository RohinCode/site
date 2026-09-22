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
    if (!response.ok) {
      localStorage.removeItem("disjiRohinToken");
      window.location.href = "./login.html";
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

start();
