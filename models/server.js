const express = require("express");
const cors = require("cors");
const color = require("colors");
const fileUpload = require('express-fileupload');
const { dbConnection } = require("../database/config");


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3030;

    //Paths
    this.paths = {
      usersRoutePath: '/api/users',
      authPath: '/api/auth',
      categories: '/api/categories',
      products: '/api/products',
      search: '/api/search',
      upload: '/api/upload',
    }

    //Database Connection
    this.connectToDB();

    // Middlewares
    this.middlewares();

    //Routes of my application
    this.routes();
  }

  async connectToDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Reading and Parsing of the Body
    this.app.use(express.json());

    //Public Directory
    this.app.use(express.static("public"));
    
    //Upload file
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true
  }));
  }

  routes() {
    this.app.use(this.paths.authPath, require('../routes/auth'));
    this.app.use(this.paths.usersRoutePath, require('../routes/users'));
    this.app.use(this.paths.categories, require('../routes/categories'));
    this.app.use(this.paths.products, require('../routes/products'));    
    this.app.use(this.paths.search, require('../routes/search'));
    this.app.use(this.paths.upload, require('../routes/uploads'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running in port ${this.port}`.blue);
    });
  }
}

module.exports = Server;
