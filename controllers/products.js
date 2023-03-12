const { response, request } = require("express");
const { Product } = require("../models");

const createProduct = async (req = request, res = response) => {
    const { status, user, ...others } = req.body
    
    const name = others.name.toUpperCase();    

    const productDb = await Product.findOne({ name });

    if (productDb) {
        return res.status(400).json({
            msg: `The \'${productDb.name}\' product already exists`,
        });
    }

    const data = {
       ...others,
        name,
        user: req.userAuthenticated._id,
    }

    const product = new Product(data);
    await product.save();

    res.status(201).json(product);
}

const getProducts = async (req = request, res = response) => {
    const { limit = 3, from = 0 } = req.query;
    const query = { status: true };
  
    const [total, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query)
        .populate("user", "name")
        .populate("category", "name")
        .skip(Number(from))
        .limit(Number(limit)),
    ]);    
  
    res.status(200).json({ total, products });
}

const getProduct = async (req = request, res = response) => {
    const { id } = req.params;
    const product = await Product.findById(id)
                            .populate("user", "name")
                            .populate("category", "name");

    res.status(200).json({ product });
}

const updateProduct = async (req = request, res = response) => {
    const { id } = req.params;

    const { status, user, ...others } = req.body;

    if (others.name) {
        others.name = others.name.toUpperCase();
    }    
    
    others.user = req.userAuthenticated._id;

    const productToUpdate = await Product.findByIdAndUpdate(id, others, {new: true});
    res.status(200).json({ productToUpdate });
}

const deleteProduct = async (req = request, res = response) => {
    const { id } = req.params;

    const productToDelete = await Product.findByIdAndUpdate(id, {status:false}, {new:true});

    const userAuth = req.userAuthenticated;

    res.status(200).json({
        productToDelete,
        userAuth
    });
}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}
