const { Router } = require("express");
const { check } = require("express-validator");

const { login, googleSignIn } = require("../controllers/auth");
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

router.post(
    '/google', 
    [
        check("id_token", "Google Token ID is mandatory").not().isEmpty(),        
        fieldsValidator
    ],
    googleSignIn
);

module.exports = router;