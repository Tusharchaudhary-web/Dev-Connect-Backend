const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    Password: {
        type: String
    },
    ConfirmPassword: {
        type: String,
    },
    PhotoURL: {
        type: String
    },
    About: {
        type: String,
        default: "Hello this is about myself"
    },
    Skills: {
        type: [String]
    }
},
    {
        timestamps: true
    })

userSchema.methods.getJWT = async function () {
    const user = this;
    const payload = { _id: user._id };
    const secret_key = "Tushar@123";

    const token = await jwt.sign(payload, secret_key, { expiresIn: "7d" });
    return token;
}

userSchema.methods.verifyPassword = function (PasswordInputByUser) {
    const user = this;
    const isPasswordValid = bcrypt.compare(
        PasswordInputByUser, this.Password);
    return isPasswordValid;
}

const User = new mongoose.model('user', userSchema);

module.exports = { User };