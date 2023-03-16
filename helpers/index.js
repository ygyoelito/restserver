const createJWT    = require('./createJWT');
const dbValidators = require('./dbValidators');
const googleVerify = require('./googleVerify');
const uploadFile   = require('./uploadFile');

module.exports = {
    ...createJWT,
    ...dbValidators,
    ...googleVerify,
    ...uploadFile
}