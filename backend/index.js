const express = require("express");
const app = express();


const router = require("./src/routes");
require("./startup/config")(app, express);
require("./startup/db")();
require("./startup/logging")();

app.use("/api", router);
require("./startup/url")(app, express);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));