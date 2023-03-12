const { Router } = require("express");
const { search, searchProductByCategory } = require("../controllers/search")

const router = Router();

router.get(
    "/:collection/:term",
    search
)

router.get(
    "/:category",
    searchProductByCategory,
)


module.exports = router