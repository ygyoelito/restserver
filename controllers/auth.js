const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { createJWT } = require("../helpers/createJWT");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    //verificar si el email existe
    if (!user) {
      return res.status(400).json({
        msg: "User or Password not valid - (email)"
      });
    }

    //verificar si el usuario está activo
    if (!user.status) {
      return res.status(400).json({
        msg: "User or Password not valid - (status: false)"
      });
    }

    //verificar el password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "User or Password not valid - (password)"
      });
    }

    //generar el jwt
    const token = await createJWT(user.id);

    res.json({ user, token });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something is wrong" });
  }  
};

module.exports = {
  login,
};
