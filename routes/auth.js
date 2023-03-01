const { Router } = require("express");
const { check } = require("express-validator");

const { login } = require("../controllers/auth");
const { fieldsValidator } = require("../middlewares/fieldValidator");

const router = Router();

router.post(
    '/login', 
    [
        check("email", "Requires a mandatory and valid Email").isEmail(),
        check("password", "Password is mandatory").not().isEmpty(),

        fieldsValidator
    ],
    login
);

module.exports = router;