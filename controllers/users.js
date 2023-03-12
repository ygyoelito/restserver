const { response, request } = require("express");
const User = require("../models/user");
const { encryptPassword } = require("../helpers/db-validators");

const userGet = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  /*const users = await User.find( query )
    .skip(Number(from))
    .limit(Number(limit));
  const total = await User.countDocuments( query );*/

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({ total, users });
};

const userPost = async (req, res = response) => {
  const { name, email, password, img, role, status, google } = req.body;
  const user = new User({ name, email, password, img, role, status, google });
  // Other way for above code: const body = req.body; const user = new User(body);

  user.password = encryptPassword(password);

  await user.save();

  res.json({ user });
};

const userPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, status, role, ...others } = req.body;

  if (password) {
    others.password = encryptPassword(password);
  }

  const userToUpdate = await User.findByIdAndUpdate(id, others, {new: true});

  res.json({ userToUpdate });
};


const userDelete = async (req, res = response) => {
  const { id } = req.params;

  //Eliminate the record by changing the status of one of its fields
  const user_deleted = await User.findByIdAndUpdate(id, { status: false }, {new: true});

  const userAuth = req.userAuthenticated; //Authenticated user uid

  //Physically delete the record (not recomended)
  //const user_deleted = await User.findByIdAndDelete(id);

  res.json({
    user_deleted,
    userAuth,
  });
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
};
