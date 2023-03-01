const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, '(Model say): Name is mandatory']        
    },
    email: {
        type: String,
        required: [true, '(Model say): Email is mandatory'],
        unique: true
    },
    password: {
        type: String,
        required: [true, '(Model say): Password is mandatory'],        
    },
    img: {
        type: String,        
    },
    role: {
        type: String,
        required: [true, '(Model say): Role is mandatory'],
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE'],
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
})

UserSchema.methods.toJSON = function() {
    const {__v, password, _id, ... userToExport} = this.toObject();
    userToExport.uid = _id; //Just creating an alias of '_id' to 'uid'
    return userToExport;
}

module.exports = model('User', UserSchema);