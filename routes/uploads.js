const { Router } = require("express");
const { check } = require("express-validator");

const { fieldsValidator, validateFileUpload  } = require("../middlewares");
const { loadFile, updateImageCloudinary, showImage } = require("../controllers/uploads");
const { collectionsAllowed } = require("../helpers");

const router = Router();

router.post(
    "/",
    [
        validateFileUpload
    ], //middleware here... 
    loadFile
);

router.put(
    "/:collection/:id",
    [
        validateFileUpload,
        check("id", "Invalid ID").isMongoId(),
        check("collection").custom( c => collectionsAllowed (c, ['users', 'products'])),
        fieldsValidator
    ], 
    updateImageCloudinary
);

router.get(
    "/:collection/:id",
    [
        check("id", "Invalid ID").isMongoId(),
        check("collection").custom( c => collectionsAllowed (c, ['users', 'products'])),
        fieldsValidator
    ], 
    showImage
);

module.exports = router;
