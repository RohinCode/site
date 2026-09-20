const controller = require("../controller");

module.exports = new (class extends controller {
  async addToCart(req, res) {
    const { productId } = req.body;

    const product = await this.Product.findById(productId);

    if (!product) {
      return this.response({
        res,
        code: 404,
        message: "محصولی پیدا نشد",
      });
    }

    let cart = await this.Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      cart = new this.Cart({
        user: req.user._id,
        products: [productId],
      });
    } else {
      // اینجا بررسی کن
      const alreadyExists = cart.products.some(
        (id) => id.toString() === productId,
      );

      if (alreadyExists) {
        return this.response({
          res,
          code: 400,
          message: "این محصول قبلاً در سبد خرید است",
        });
      }
      cart.products.push(productId);
    }

    await cart.save();

    this.response({ res, message: "محصول به سبد خرید اضافه شد", data: cart });
  }

  async getProdoct(req, res) {
    const product = await this.Cart.findOne({ user: req.user.id }).populate([
      "products",
      "user",
    ]);
    if (!product) {
      return this.response({ res, code: 404, message: "پیدا نشد" });
    }
    this.response({ res, data: product, message: "ok" });
  }

  async isComplate(req, res) {
    const totalPrice = req.header("total");
    const cart = await this.Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      return this.response({
        res,
        code: 404,
        message: "سبد خرید پیدا نشد",
      });
    }

    const registered = new this.Registered({
      user: cart.user,
      products: cart.products,
      totalPrice,
    });

    cart.products = [];

    await registered.save();
    await cart.save();

    this.response({
      res,
      message: "ثبت شد",
    });
  }

  async registered(req, res) {
    const registeredProduct = await this.Registered.find()
      .populate("products")
      .populate("user", "-password");

    if (registeredProduct.length == 0) {
      return this.response({ res, message: "هیچ خریدی انجام نشده" });
    }

    this.response({
      res,
      message: "لیست خریدهای انجام شده",
      data: registeredProduct,
    });
  }

  async isDelivered(req, res) {
    const registeredProduct = await this.Registered.findOneAndDelete({
      _id: req.body.orderId,
    });

    if (!registeredProduct) {
      return this.response({ res, message: "این خرید یافت نشد" });
    }

    this.response({ res, message: "با موفقیت حذف شد" });
  }
})();
