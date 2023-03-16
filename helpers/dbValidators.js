const bcryptjs = require("bcryptjs");

/*onst Role = require("../models/role");
const User = require("../models/user");
const Category = require("../models/category");*/

const { Role, User, Category, Product } = require("../models");

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

//Verify if the category exist with this ID
const categoryByIdExist = async (id = "") => {
  const ifCategory = await Category.findById(id);
  if (!ifCategory) {
    throw new Error (`No Category with ID: \'${id}\'`);
  }
};

//Verify if the category exists
const categoryExist = async (name = "") => {
  name = name.toUpperCase();
  const ifCategory = await Category.findOne({ name });
  if (ifCategory) {
    throw new Error (`The category: \'${name}\' already exist`);
  }
};


//Verify if the product exist with this ID
const productByIdExist = async (id = "") => {
  const ifProduct = await Product.findById(id);
  if (!ifProduct) {
    throw new Error (`No Product with ID: \'${id}\'`);
  }
};

//Validate allowed collections
const collectionsAllowed = (collection = '', collections = []) => {
  const isInclude = collections.includes(collection);

  if (!isInclude) {
    throw new Error (`Collection \'${collection}\' is not allowed. Only ${collections} is allowed`)
  }

  return true;
}


module.exports = {
  isRoleValid,
  emailExist,
  encryptPassword,
  userByIdExist,
  categoryByIdExist,
  categoryExist,
  productByIdExist,
  collectionsAllowed
};
