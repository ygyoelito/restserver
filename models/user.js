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
    const {__v, password, ... userToExport} = this.toObject();
    return userToExport;
}

module.exports = model('User', UserSchema);