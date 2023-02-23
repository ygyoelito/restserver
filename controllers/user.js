const { response, request } = require("express");

const userGet = (req = request, res = response) => {
  const {q, lname='No lname', apikey} = req.query;

  //Ex: /api/users?q=...&lname=...&apikey=...
  res.json({
    msg: "get API - controller",
    q,
    lname,
    apikey
  });
};

const userPost = (req, res = response) => {
  const { name, age } = req.body;

  //Ex: /api/users and some settings in Postman (Body/raw/JSON)
  res.json({
    msg: "post API - controller",
    name,
    age,    
  });
};

const userPut = (req, res = response) => {
  const { id } = req.params;

   //Ex: /api/users/125
  res.json({
    msg: "put API - controller",
    id,
  });
};

const userPatch = (req, res = response) => {
  res.json({
    msg: "patch API - controller",
  });
};

const userDelete = (req, res = response) => {
  res.json({
    msg: "delete API - controller",
  });
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete,
};
