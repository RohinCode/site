const controller = require("./../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async dashboard(req, res) {
    res.json({ message: "user dashboard" });
  }

  async me(req, res) {
    this.response({
      res,
      data: _.pick(req.user, ["name", "email", "address", "phoneNamber"]),
    });
  }

  async editInfo(req, res) {
    const user = req.user;

    const { phoneNamber, address } = req.body;

    if (phoneNamber !== undefined) {
      if (!/^\d{11}$/.test(phoneNamber)) {
        return this.response({
          res,
          code: 400,
          message: "شماره تلفن باید ۱۱ رقم و فقط شامل عدد باشد",
        });
      }

      user.phoneNamber = phoneNamber;
    }

    if (address !== undefined) {
      user.address = address;
    }

    await user.save();

    this.response({
      res,
      message: "اطلاعات با موفقیت ویرایش شد",
      data: user,
    });
  }
})();
