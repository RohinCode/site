const path = require("path");

module.exports = function (app, express) {
  const frontend = path.join(__dirname, "../../frontend");

  // =========================
  // فایل‌های فرانت‌اند
  // =========================

  app.use("/styles", express.static(path.join(frontend, "styles")));

  app.use("/scripts", express.static(path.join(frontend, "scripts")));

  app.use("/src", express.static(path.join(frontend, "src")));

  app.get("/", (req, res) => {
    res.sendFile(path.join(frontend, "/index.html"));
  });

  app.get("/admin", (req, res) => {
    res.sendFile(path.join(frontend, "html/admin/admin.html"));
  });

  app.get("/user", (req, res) => {
    res.sendFile(path.join(frontend, "html/user/user.html"));
  });

  app.get("/login", (req, res) => {
    res.sendFile(path.join(frontend, "html/user/login.html"));
  });

  app.get("/singup", (req, res) => {
    res.sendFile(path.join(frontend, "html/user/singup.html"));
  });

  app.get("/question", (req, res) => {
    res.sendFile(path.join(frontend, "html/question.html"));
  });

  app.get("/shoopingBox", (req, res) => {
    res.sendFile(path.join(frontend, "html/shoopingBox.html"));
  });

  app.use((req, res) => {
    res.status(404).sendFile(path.join(frontend, "html/404.html"));
  });
};
