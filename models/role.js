const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, '(Model say): Rol is mandatory']   
    }
});


module.exports = model("Role", RoleSchema);