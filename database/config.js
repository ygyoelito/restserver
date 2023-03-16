const mongoose = require("mongoose");
const colors = require("colors");

const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_ATLAS_CNX);
    console.log("Database Online Succefully".blue);
  } catch (error) {
    console.log(error);
    throw new Error("Error at the start of the database".red);
  }
};

module.exports = {
  dbConnection,
};
