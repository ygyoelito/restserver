const { request, response } = require("express");
const path = require("path");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const { uploadFile } = require("../helpers");
const { User, Product } = require("../models");

const loadFile = async (req = request, res = response) => {
  try {
    const fileName = await uploadFile(req.files, undefined, "images");
    res.json({ fileName });
  } catch (error) {
    res.status(400).json({ error });
  }
};

/**
 * The 'updateImage' function appears here for educational purposes only
 */
const updateImage = async (req = request, res = response) => {
  const { collection, id } = req.params;

  let modelo;

  switch (collection) {
    case "users":
      modelo = await User.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `No user with ID: \'${id}\'` });
      }
      break;

    case "products":
      modelo = await Product.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `No product with ID: \'${id}\'` });
      }
      break;

    default:
      return res.status(500).json({ msg: "Validate this!" });
  }

  //Delete previous images
  if (modelo.img) {
    //Delete the server image
    const pathImage = path.join(
      __dirname,
      "../uploads",
      collection,
      modelo.img
    );
    if (fs.existsSync(pathImage)) {
      fs.unlinkSync(pathImage);
    }
  }

  const fileName = await uploadFile(req.files, undefined, collection);
  modelo.img = fileName;

  await modelo.save();

  res.json({ modelo });
};

const updateImageCloudinary = async (req = request, res = response) => {
  const { collection, id } = req.params;

  let modelo;

  switch (collection) {
    case "users":
      modelo = await User.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `No user with ID: \'${id}\'` });
      }
      break;

    case "products":
      modelo = await Product.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `No product with ID: \'${id}\'` });
      }
      break;

    default:
      return res.status(500).json({ msg: "Validate this!" });
  }

  //Delete previous images
  if (modelo.img) {
    const nameArr = modelo.img.split('/');
    const [ public_id ] = nameArr[nameArr.length - 1].split('.'); 
    cloudinary.uploader.destroy( public_id );    
  }

  const { tempFilePath } = req.files.dcto;
  const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

  modelo.img = secure_url;

  await modelo.save();

  res.json({ modelo });
};

const showImage = async (req = request, res = response) => {
  const { collection, id } = req.params;

  let modelo;

  switch (collection) {
    case "users":
      modelo = await User.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `No user with ID: \'${id}\'` });
      }
      break;

    case "products":
      modelo = await Product.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `No product with ID: \'${id}\'` });
      }
      break;

    default:
      return res.status(500).json({ msg: "Validate this!" });
  }

  if (modelo.img) {
    const pathImage = path.join(
      __dirname,
      "../uploads",
      collection,
      modelo.img
    );
    if (fs.existsSync(pathImage)) {
      return res.sendFile(pathImage);
    }
  }
  
  const noImage = path.join(
    __dirname,
    "../assets/no-image.jpg",
  );
  return res.sendFile(noImage);

};

module.exports = {
  loadFile, 
  showImage,
  updateImageCloudinary
};
