const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;

const { User, Category, Product } = require("../models");

const colections_allowed = [
  "users",
  "categories",
  "products",
  "roles",
];

const searchUsers = async (term = "", res = response, req = request) => {
  const isMongoId = ObjectId.isValid(term);
  if (isMongoId) {
    const user = await User.findById(term);
    return res.json({
      result: user ? [user] : [],
    });
  }

  const regex = new RegExp(term, "i");
  const query = {
    $or: [{ name: regex }, { email: regex }],
    $and: [{ status: true }],
  };
  const { limit = 5, from = 0 } = req.query;

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  return res.json({
    total,
    result: users,
  });
};

const searchCategories = async (term = "", res = response, req = request) => {
  const isMongoId = ObjectId.isValid(term);
  if (isMongoId) {
    const category = await Category.findById(term).populate("user", "name");
    return res.json({
      result: category ? [category] : [],
    });
  }

  const regex = new RegExp(term, "i");
  const query = {
    $or: [{ name: regex }],
    $and: [{ status: true }],
  };
  const { limit = 5, from = 0 } = req.query;

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .populate("user", "name")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  return res.json({
    total,
    result: categories,
  });
};

const searchProducts = async (term = "", res = response, req = request) => {
  const isMongoId = ObjectId.isValid(term);
  if (isMongoId) {
    const product = await Product.findById(term)
      .populate("category", "name")
      .populate("user", "name");
    return res.json({
      result: product ? [product] : [],
    });
  }

  const regex = new RegExp(term, "i");
  const query = {
    $or: [{ name: regex }],
    $and: [{ status: true }],
  };
  const { limit = 5, from = 0 } = req.query;

  const [total, product] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate("category", "name")
      .populate("user", "name")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  return res.json({
    total,
    result: product,
  });
};

const search = (req = request, res = response) => {
  const { collection, term } = req.params;

  if (!colections_allowed.includes(collection)) {
    res.status(400).json({
      msg: `Searches only on collections: ${colections_allowed}`,
    });
  }

  switch (collection) {
    case "users":
      searchUsers(term, res, req);
      break;
    case "categories":
      searchCategories(term, res, req);
      break;
    case "products":
      searchProducts(term, res, req);
      break;
    default:
      res.status(500).json({
        msg: "Search not implemented",
      });
      break;
  }
};

const searchProductByCategory = async (req = request, res = response) => {
  const categoryParam = req.params.category;
  const { limit = 5, from = 0 } = req.query;

  const isMongoId = ObjectId.isValid(categoryParam);
  if (isMongoId) {
    const queryMongoId = { category: ObjectId(categoryParam), status: true }
    const product = await Product.find(queryMongoId)
      .populate("category", "name")
      .populate("user", "name")
      .skip(Number(from))
      .limit(Number(limit));
    return res.json({
      result: product ? [product] : [],
    });
  }

  const regex = new RegExp(categoryParam, "i");
  const queryCategoryName = {
    $or: [{ name: regex }],
    $and: [{ status: true }],
  };
  const categories = await Category.find(queryCategoryName);
  if (!categories.length) {
    return res.status(400).json({
      msg: `There is no restult with \'${term}\' category`,
    });
  }

  const queryP = {
    $or: [
      ...categories.map((c) => {
        return { category: c._id };
      }),
    ],
    $and: [{ status: true }],
  };

  const [total, products] = await Promise.all([
    Product.countDocuments(queryP),
    Product.find(queryP)
      .populate("category", "name")
      .populate("user", "name")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  return res.json({
    total,
    result: products,
  });

};


module.exports = {
  search,
  searchProductByCategory,
};
