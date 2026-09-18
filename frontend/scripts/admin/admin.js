const token = localStorage.getItem("disjiRohinToken");
let result;
let Admindata;

async function start() {
  if (!token) {
    return (window.location.href = "./login.html");
  }
  try {
    const response = await fetch("http://localhost:3000/api/admin", {
      method: "GET",
      headers: {
        "x-auth-token": token,
      },
    });
    if (!response.ok) {
      return (window.location.href = "./login.html");
    }
    result = await response.text();
    console.log(result);
    console.log("ok");
  } catch (error) {
    console.log(error);
  }
}

start();
