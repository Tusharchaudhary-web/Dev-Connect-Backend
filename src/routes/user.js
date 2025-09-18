const express = require('express');
const userRouter = express.Router();

const { ConnectionRequestModel } = require("../models/connectionRequest");

const { userAuth } = require("../middlewares/userAuth");

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequestModel.find({
            toUserId: loggedInUser.id,
            status: "interested"
        });
        res.status(200).json( connectionRequests );
    }

    catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

module.exports = { userRouter };
