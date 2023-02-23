const express = require('express');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3030;
    this.usersRoutePath = '/api/users';

    // Middlewares
    this.middlewares();

    //Routes of my application
    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use( cors() );

    //Reading and Parsing of the Body
    this.app.use( express.json() );

    //Public Directory
    this.app.use( express.static('public') )
  }

  routes() {
    this.app.use( this.usersRoutePath, require('../routes/user')); 
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running in port", this.port);
    });
  }
}

module.exports = Server;
