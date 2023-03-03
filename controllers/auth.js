const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { createJWT } = require("../helpers/createJWT");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    //verificar si el email existe
    if (!user) {
      return res.status(400).json({
        msg: "User or Password not valid - (email)",
      });
    }

    //verificar si el usuario está activo
    if (!user.status) {
      return res.status(400).json({
        msg: "User or Password not valid - (status: false)",
      });
    }

    //verificar el password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "User or Password not valid - (password)",
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

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, img, email } = await googleVerify(id_token);

    let google_user = await User.findOne({ email });

    //if not exist in db...
    if (!google_user) {
      //create user...
      const data = {
        name,
        email,
        password: ":D",
        img, 
        google: true,
      };

      google_user = new User(data);
      await google_user.save();
    }

    //if exist in db, but status = false...
    if (!google_user.status) {
      return res.status(401).json({
        msg: "User blocked. Contact the administrator",
      });
    }

    //generar el jwt
    const token = await createJWT(google_user.id);

    res.json({
      google_user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Token not verified",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
