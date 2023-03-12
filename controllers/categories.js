const { response, request } = require("express");
const { Category } = require("../models");

const createCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  const categoryDb = await Category.findOne({ name });

  if (categoryDb) {
    return res.status(400).json({
      msg: `The \'${categoryDb.name}\' category already exists`,
    });
  }

  const data = {
    name,
    user: req.userAuthenticated._id,
  };

  const categoy = new Category(data);
  await categoy.save();

  res.status(201).json(categoy);
};

const getCategories = async (req = request, res = response) => {
  const { limit = 3, from = 0 } = req.query;
  const query = { status: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .populate("user", "name")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  res.status(200).json({ total, categories });
};

const getCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate("user", "name");

  res.status(200).json({ category });
};

const updateCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const { status, user, ...others } = req.body;

  others.name = others.name.toUpperCase();
  others.user = req.userAuthenticated._id;

  const categoryToUpdate = await Category.findByIdAndUpdate(id, others, {new: true});
  res.status(200).json({ categoryToUpdate });
};

const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;

  const categoryToDelete = await Category.findByIdAndUpdate(id, {status: false}, {new: true});

  const userAuth = req.userAuthenticated;

  res.status(200).json({
    categoryToDelete,
    userAuth
  });
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
