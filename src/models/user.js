const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
        type: String,
        default:"https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
    },
    About: {
        type: String,
        default: "Hello this is about myself"
    },
},
    {
        timestamps: true
    })

userSchema.methods.getJWT = async function () {
    const user = this;
    const payload = { _id: user._id };
    const secret_key = process.env.JWT_SECRET;

    const token = await jwt.sign(payload, secret_key, { expiresIn: "7d" });
    return token;
}

userSchema.methods.verifyPassword = function (PasswordInputByUser) {
    const user = this;
    const isPasswordValid = bcrypt.compare(
        PasswordInputByUser, this.Password);
    return isPasswordValid;
}

const User = new mongoose.model('User', userSchema);

module.exports = { User };