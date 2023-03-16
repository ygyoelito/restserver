const fieldValidator = require("../middlewares/fieldValidator");
const validatorJWT = require("../middlewares/validatorJWT");
const validatorRol = require("../middlewares/validatorRol");
const validateFileUpload = require("../middlewares/validatorFileUpload")

module.exports = {
  ...fieldValidator,
  ...validatorJWT,
  ...validatorRol,
  ...validateFileUpload
};
