const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function googleVerify(token = "") {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
    // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]

    //read more in: https://developers.google.com/identity/gsi/web/guides/verify-google-id-token?hl=es-419
  });

  /* Get all Google user info using this:
   * const payload = ticket.getPayload();
   * console.log(payload);
   */

  const { name, picture, email } = ticket.getPayload();

  return {
    name,
    img: picture, //using this alias to match with Mongo User model
    email,
  };
}

module.exports = {
  googleVerify,
};
