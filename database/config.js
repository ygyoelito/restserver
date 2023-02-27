const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_ATLAS_CNX, {
      /*useNewUrlParser: true,
      useUnifiedTopology: true,*/
    });
    console.log("Database Online Succefully");
  } catch (error) {
    console.log(error);
    throw new Error("Error at the start of the database");
  }
};

module.exports = {
  dbConnection,
};
