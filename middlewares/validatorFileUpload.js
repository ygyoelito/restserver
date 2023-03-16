const { request, response } = require("express");

const validateFileUpload = (req = request, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.dcto) {
    return res.status(400).json({
      msg: "No files were uploaded - (validateFileUpload -> dcto).",
    });    
  }

  next();
};

module.exports = {
  validateFileUpload,
};
