const fieldValidator = require("../middlewares/fieldValidator");
const validatorJWT = require("../middlewares/validatorJWT");
const validatorRol = require("../middlewares/validatorRol");

module.exports = {
  ...fieldValidator,
  ...validatorJWT,
  ...validatorRol,
};
