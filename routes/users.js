const { Router } = require("express");
const { check } = require("express-validator");

const {
  fieldsValidator,
  validateJWT,
  isAdminRole,
  hasRole,
} = require("../middlewares/index");

const {
  isRoleValid,
  emailExist,
  userByIdExist,
} = require("../helpers/db-validators");

const {
  userGet,
  userPost,
  userPut,
  userDelete,
} = require("../controllers/users");

const router = Router();

router.get("/", userGet);

router.post(
  "/",
  [
    check("name", "Name is Mandatory").not().isEmpty(),
    check(
      "password",
      "Password is mandatory and must be contain more of 6 characters"
    ).isLength({ min: 6 }),
    check("email", "Invalid Email").isEmail(),
    check("email").custom(emailExist),

    //A. check('role', "Role not valid").isIn(['ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE']), //validation against string
    //B. check('role').custom((rol) => isRoleValid(rol)), //validation against db, optimized below by eliminating unnecessary arguments
    check("role").custom(isRoleValid), //B. (enhanced!)

    fieldsValidator,
  ],
  userPost
);

router.put(
  "/:id",
  [
    check("id", "Invalid ID").isMongoId(),
    check("id").custom(userByIdExist),
    check("role").custom(isRoleValid),
    fieldsValidator,
  ],
  userPut
);

router.delete(
  "/:id",
  [
    validateJWT,
    //isAdminRole, //fuerza a que sea un rol de administrador para ejecutarse
    hasRole("ADMIN_ROLE", "SALES_ROLE"), //fuerza a que sea un conjunto de roles para ejecutarse
    check("id", "Invalid ID").isMongoId(),
    check("id").custom(userByIdExist),
    fieldsValidator,
  ],
  userDelete
);

module.exports = router;
