const controller = require("../controller");
const _ = require("lodash");
const domin = "http://localhost:3000";
module.exports = new (class extends controller {
  async OfferProducts(req, res) {
    let products = await this.Product.find({
      isSuggest: true,
      show: true,
    }).limit(8);
    if (products.length == 0)
      return this.response({
        res,
        code: 400,
        message: "ما هیچ محصول پیشنهادی نداریم",
      });
    this.response({ message: "suggestProduct", data: products, res });
  }

  async getCategoryProduct(req, res) {
    let products = await this.Product.find({
      category: req.params.category,
      show: true,
    }).limit(20);
    if (products.length == 0)
      return this.response({
        res,
        code: 400,
        message: "ما هیچ محصولی در این بسته‌بندی نداریم",
      });
    this.response({ message: "محصولات این دسته‌بندی ", data: products, res });
  }

  async createProduct(req, res) {
    let product = await this.Product.findOne({ name: req.body.name });
    if (product) {
      return this.response({
        res,
        code: 400,
        message: "این محصول قبلا ساخته شده بود",
      });
    }

    product = new this.Product({
      name: req.body.name,
      star: req.body.star,
      price: req.body.price,
      category: req.body.category,
      hotOffer: req.body.hotOffer === "on",
      isSuggest: req.body.isSuggest === "on",
      img: `${domin}/images/${req.file.filename}`,
    });
    await product.save();

    this.response({
      res,
      message: "محصول با موفقیت ساخته شد",
      data: _.pick(product, [
        "_id",
        "name",
        "star",
        "price",
        "img",
        "hotOffer",
        "isSuggest",
        "category",
        "show",
      ]),
    });
  }
})();
