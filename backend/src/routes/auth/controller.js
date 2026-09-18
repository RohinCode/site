const controller = require("./../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = new (class extends controller {
  async register(req, res) {
    let user = await this.User.findOne({ email: req.body.email });
    if (user) {
      return this.response({
        res,
        code: 400,
        message: "این کاربر قبلا ثبت‌نام کرده",
      });
    }

    user = await this.User.findOne({ name: req.body.name });
    if (user) {
      return this.response({
        res,
        code: 400,
        message: "این نام کاربری قبلا انتخاب شده",
      });
    }
    // const {email, name, password} = req.body;
    // user = new this.User({email, name, password});
    user = new this.User(_.pick(req.body, ["name", "email", "password"]));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = jwt.sign({ _id: user.id }, config.get("jwt_key"));
    this.response({
      res,
      message: "کاربر با موفقیت وارد شد",
      data: { token, user: _.pick(user, ["_id", "name", "email"]) },
    });
  }

  async login(req, res) {
    const user = await this.User.findOne({ name: req.body.name });
    if (!user) {
      return this.response({
        res,
        code: 400,
        message: "نام کاربری یا رمز عبور صحیح نیست",
      });
    }
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return this.response({
        res,
        code: 400,
        message: "نام کاربری یا رمز عبور صحیح نیست",
      });
    }
    const token = jwt.sign({ _id: user.id }, config.get("jwt_key"));
    this.response({ res, message: "ورود موفقت آمیز", data: { token } });
  }

  async adminLogin(req, res) {
    const user = await this.User.findOne({ name: req.body.name });

    if (!user) {
      return this.response({
        res,
        code: 400,
        message: "نام کاربری یا رمز عبور صحیح نیست",
      });
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);

    if (!isValid) {
      return this.response({
        res,
        code: 400,
        message: "نام کاربری یا رمز عبور صحیح نیست",
      });
    }

    if (!user.isadmin) {
      return this.response({
        res,
        code: 403,
        message: "داداش. ادمین نیستی",
      });
    }

    const token = jwt.sign({ _id: user.id }, config.get("jwt_key"));

    this.response({
      res,
      message: "ورود ادمین موفقیت آمیز",
      data: { token },
    });
  }
})();
