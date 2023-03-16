const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFile = (
  files,
  extensionValids = ["png", "jpg", "jpeg", "gif"],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    const { dcto } = files; //full file name
    const docTemp = dcto.name.split(".");
    const extension = docTemp[docTemp.length - 1]; //only file extension

    if (!extensionValids.includes(extension)) {
      return reject(
        `Extension \'${extension}\' is not allowed. Only \'${extensionValids}\' are allowed.`
      );
    }

    const tempName = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", folder, tempName);

    dcto.mv(uploadPath, function (err) {
      if (err) {
        reject(err);
      }

      resolve(tempName);
    });

  });

};

module.exports = {
  uploadFile,
};
