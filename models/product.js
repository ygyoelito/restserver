const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, "(Model say): Name is mandatory"],
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: [true, "(Model say): Status is mandatory"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "(Model say): User Reference is mandatory"],
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true,  "(Model say): Category Reference is mandatory"],
  },
  description: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true
  }
});

ProductSchema.methods.toJSON = function () {
  const { __v, status, ...productToExport } = this.toObject();
  return productToExport;
};

module.exports = model("Product", ProductSchema);
