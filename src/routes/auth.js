const express = require('express');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const { validateSignUp } = require('../utils/validateSignUp');
const { validateLogin } = require('../utils/validateLogin');



// const authRouter = express.Router();

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    try {
        validateSignUp(req);

        const { fullName, Email, Password, About, PhotoURL } = req.body;

        const existingUser = await User.findOne({ Email: Email });
        if (existingUser) {
            throw new Error("Invalid credentials");
        }

        const hashPassword = await bcrypt.hash(Password, 10);

        const user = new User({ fullName, Email, Password: hashPassword, About, PhotoURL });
        await user.save();
        res.status(201).json({ message: `${user.fullName} saved sucessfully`, user });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        validateLogin(req,res);
        const { Email, Password } = req.body;

        const user = await User.findOne({ Email: Email });
        if (!user) {
             return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await user.verifyPassword(Password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = await user.getJWT();
        res.cookie('token', token, { httpOnly: true, secure: true, expires: new Date(Date.now() + 12 * 3600000) });
        res.status(200).json({ message: `${user.fullName} loggedin sucessfully`, user });
        // when a user loggedIn , server creates a token and send it to the user inside a cookie.
    }
    catch (err) {
        return res.status(400).json({ message: err.message });
    }
})

authRouter.post("/logout", (req, res) => {
    const token = null;
    res.cookie('token', token, { expires: new Date(Date.now()) })
    res.json({ message: 'user loggedout sucessfully' });
    // set the token to null and expire the cookie
})


module.exports = { authRouter };