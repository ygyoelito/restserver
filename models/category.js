const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
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
    ref: 'User',
    required: [true, "(Model say): User Reference is mandatory"],
  }
});

CategorySchema.methods.toJSON = function () {
  const { __v, status, _id, ...categoryToExport } = this.toObject();
    return categoryToExport;
};

module.exports = model("Category", CategorySchema);
