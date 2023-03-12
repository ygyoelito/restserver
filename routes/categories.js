const { Router } = require("express");
const { check } = require("express-validator");

const { validateJWT, fieldsValidator, isAdminRole } = require("../middlewares");

const {
  categoryByIdExist,
  categoryExist,
} = require("../helpers/db-validators");

const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");

const router = Router();

router.get("/", getCategories);

router.get(
  "/:id",
  [
    check("id", "Invalid ID").isMongoId(),
    check("id").custom(categoryByIdExist),
    fieldsValidator,
  ],
  getCategory
);

router.post(
  "/",
  [
    validateJWT,
    check("name", "Name is mandatory").not().isEmpty(),
    fieldsValidator,
  ],
  createCategory
);

router.put(
  "/:id",
  [
    validateJWT,
    check("id", "Invalid ID").isMongoId(),
    check("id").custom(categoryByIdExist),
    check("name", "Name of Category is Mandatory").not().isEmpty(),
    check("name").custom(categoryExist),
    fieldsValidator,
  ],
  updateCategory
);

router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "Invalid ID").isMongoId(),
    check("id").custom(categoryByIdExist),
    fieldsValidator,
  ],
  deleteCategory
);

module.exports = router;
