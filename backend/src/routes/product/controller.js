const controller = require("../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async OfferProducts(req, res) {
    let products = await this.Product.find({ isSuggest: true }).limit(8);
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
        message: "this product already created",
      });
    }

    product = new this.Product(
      _.pick(req.body, [
        "name",
        "star",
        "price",
        "img",
        "hotOffer",
        "isSuggest",
        "category",
      ]),
    );
    await product.save();

    this.response({
      res,
      message: "the product successfuly created",
      data: _.pick(product, [
        "_id",
        "name",
        "star",
        "price",
        "img",
        "hotOffer",
        "isSuggest",
        "category",
      ]),
    });
  }
})();
