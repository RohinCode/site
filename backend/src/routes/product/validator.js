const expressValidator = require("express-validator");
const check = expressValidator.check;

module.exports = new (class {
  createProductValidator() {
    return [
      check("name").not().isEmpty().withMessage("اسم نمی‌تونه خالی باشه"),
      check("star")
        .isInt({ max: 6 })
        .withMessage("ستاره نمیتونه از 6 بیشتر باشه"),
    ];
  }
})();
