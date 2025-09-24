const express = require('express');
const { userAuth } = require('../middlewares/userAuth');
const { validateUserProfile } = require("../utils/validateUserProfile");

const profileRouter = express.Router();


profileRouter.get("/profile/view", userAuth, (req, res) => {
    const user = req.user;
    res.status(200).json({ user });
})


profileRouter.patch("/profile/edit", userAuth, validateUserProfile ,async (req, res) => {
    try {
        const loggedInUser = req.user;

        Object.assign(loggedInUser, req.body);

        await loggedInUser.save();

        res.status(200).json({ message: 'Profile updated sucessfully', data: loggedInUser });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
})

module.exports = { profileRouter };




