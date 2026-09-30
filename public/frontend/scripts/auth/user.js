export const token = localStorage.getItem("disjiRohinToken");
export const domain = window.location.origin;

async function start() {
  if (!token) {
    return (window.location.href = "/login");
  }
  try {
    const response = await fetch(`${domain}/api/user/me`, {
      method: "GET",
      headers: {
        "x-auth-token": token,
      },
    });
    if (!response.ok) {
      localStorage.removeItem("disjiRohinToken");
      window.location.href = "/login";
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

start();
