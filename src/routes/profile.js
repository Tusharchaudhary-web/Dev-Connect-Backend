const express = require('express');
const { userAuth } = require('../middlewares/userAuth');
const { validateUserProfile } = require("../utils/validateUserProfile");

const profileRouter = express.Router();

profileRouter.post("/profile/view", userAuth, async (req, res) => {
    const user = req.user;
    res.json({ user });
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateUserProfile(req)) {
            return res.status(400).json({ message: 'Update is not allowed' });
        }
        const loggedInUser = req.user;

        // Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);
        Object.assign(loggedInUser,req.body);

        await loggedInUser.save();
        console.log(loggedInUser);

        res.json({ message: 'Profile edited sucesfully' });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
})

module.exports = { profileRouter };

// 1008230036

