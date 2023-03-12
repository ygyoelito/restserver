const express = require("express");
const cors = require("cors");
const colors = require("colors");
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
  }

  routes() {
    this.app.use(this.paths.authPath, require('../routes/auth'));
    this.app.use(this.paths.usersRoutePath, require('../routes/users'));
    this.app.use(this.paths.categories, require('../routes/categories'));
    this.app.use(this.paths.products, require('../routes/products'));    
    this.app.use(this.paths.search, require('../routes/search'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running in port ${this.port}`.red);
    });
  }
}

module.exports = Server;
