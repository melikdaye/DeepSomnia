const mongoose = require("mongoose");


const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: false,
        default:""
    },
    phoneNumber : {
        type: Number,
        required : false,
        default: null
    },
    isVerified : {
        type: Boolean,
        default: false
    },
    credits : {
        type : Number,
        default : 0
    },
    lastCreation : {
        type : Date,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pinataJWT: {
        type: String,
        required: false,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

UserSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.password;
    delete obj.pinataJWT;
    return obj;
}

// export model user with UserSchema
module.exports = mongoose.model("Users", UserSchema);
