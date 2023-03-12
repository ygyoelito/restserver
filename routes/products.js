const { Router } = require("express");
const { check } = require("express-validator");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

const { validateJWT, fieldsValidator, isAdminRole } = require("../middlewares");

const { productByIdExist, categoryByIdExist } = require("../helpers/db-validators");

const router = Router();

router.get(
    "/", 
    getProducts
);

router.get(
    "/:id",
    [
        check("id", "Invalid ID").isMongoId(),    
        check("id").custom(productByIdExist),
        fieldsValidator 
    ],
    getProduct
);

router.post(
    "/",
    [
        validateJWT,
        check("name", "Name is mandatory").not().isEmpty(),
        check("category", "Invalid ID").isMongoId(),
        check("category").custom(categoryByIdExist),        
        fieldsValidator
    ],
    createProduct
);

router.put(
    "/:id",
    [
        validateJWT,
        check("id", "Invalid ID").isMongoId(),
        check("id").custom(productByIdExist),
        check("category", "Invalid ID").isMongoId(),
        check("category").custom(categoryByIdExist),    
        fieldsValidator
    ],
    updateProduct
);

router.delete(
    "/:id",
    [
        validateJWT,
        isAdminRole,
        check("id", "Invalid ID").isMongoId(),
        check("id").custom(productByIdExist),
        fieldsValidator
    ],
    deleteProduct
)

module.exports = router;
