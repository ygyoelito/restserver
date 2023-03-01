const jwt = require("jsonwebtoken");

const createJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "4h", //expressed in seconds or a string like: "2 days", "10h", "7d"
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Token could not be generated");
        } else {
          resolve(token);
        }
      }
    );
  });
};

// Parese - JWT - Obtain payload and date of creation and expiration
/*function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}*/

module.exports = {
  createJWT,
};
