const bcryptjs = require("bcryptjs");

const Role = require("../models/role");
const User = require("../models/user");

//Verify is alowed role
const isRoleValid = async (pRole = "") => {
  const existRol = await Role.findOne({ role: pRole });
  if (!existRol) {
    throw new Error(`The \'${pRole}\' role is not registered in the database.`);
  }
};

//Verify if the mail exists
const emailExist = async (email = "") => {
  const ifEmail = await User.findOne({ email });
  if (ifEmail) {
    throw new Error (`The email: \'${email}\' already exist`);
  }
};

//Verify if the user exist with this ID
const userByIdExist = async (id = "") => {
  const ifUSer = await User.findById(id);
  if (!ifUSer) {
    throw new Error (`No user with ID: \'${id}\'`);
  }
};

//Encrypt the password
const encryptPassword = (password) => {
  const salt = bcryptjs.genSaltSync();
  return bcryptjs.hashSync(password, salt);  
}


module.exports = {
  isRoleValid,
  emailExist,
  encryptPassword,
  userByIdExist
};
