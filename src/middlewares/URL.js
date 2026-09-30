const config = require("config");

function addImageDomain(req, res, next) {
  const originalJson = res.json;

  res.json = function (data) {
    if (data?.img) {
      data.img = `${config.get("sieURL.address")}${data.img}`;
    }

    return originalJson.call(this, data);
  };

  next();
}

module.exports = addImageDomain;
