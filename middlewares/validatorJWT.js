const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token"); // X-Token is the name of a variable sent in the Header

  if (!token) {
    return res.status(401).json({
      msg: "There is no token in the petition",
    });
  }

  try {
    //Authenticated user uid
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //Read the user that corresponds this 'uid'
    const userAuthenticated = await User.findById(uid);

    //Verify if the user exists in DB    
    if (!userAuthenticated) {
        return res.status(401).json({
            msg: 'Token not valid (user not existing in DB)'
        })
    }

    //Verify if the uid has status = true
    if (!userAuthenticated.status) {
        return res.status(401).json({
            msg: 'Token not valid (status: false)'
        })
    }    
    
    req.userAuthenticated = userAuthenticated;
    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token not valid",
    });
  }
};

module.exports = {
  validateJWT,
};
