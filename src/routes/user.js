const express = require('express');
const userRouter = express.Router();

const { ConnectionRequest } = require("../models/connectionRequest");

const { userAuth } = require("../middlewares/userAuth");

const { User } = require('../models/user');

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        })
            .select("fromUserId")
            .populate("fromUserId", "fullName About PhotoURL");
        // if (connectionRequests.length === 0)
        //     return res.status(404).json({ message: 'user not found' });


        res.status(200).json({ data: connectionRequests });
    }

    catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find(
            {
                $or: [
                    { toUserId: loggedInUser._id, status: "accepted" },
                    { fromUserId: loggedInUser._id, status: "accepted" }
                ]
            }
        )
            //  .select("fullName About PhotoURL")
            .populate("fromUserId", "fullName About PhotoURL")
            .populate("toUserId", "fullName About PhotoURL");

        // if (connectionRequests.length === 0) {
        //     return res.status(404).json({ message: 'user not found' });
        // }
        const data = connectionRequests.map(row => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            else {
                return row.fromUserId;
            }
        });
        res.status(200).json({ data });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
})


/*

The person feed should be see all the users except
a) his own profile
b) his connections
c) already send the connection request
d) the profile which already have been ignored

in Short : we should see only those profiles which we have never seen on our feed except self profile

*/

userRouter.get("/user/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        //find all the connections(send + received) of the loggedin user
        const connectionRequests = await ConnectionRequest.find(
            {
                $or: [
                    { toUserId: loggedInUser.id }, { fromUserId: loggedInUser.id }
                ]
            }
        )
            .select("fromUserId toUserId")
        // .populate("fromUserId", "fullName")
        // .populate("toUserId", "fullName")

        //  connectionRequests -> These are the profiles whom i dont want in my feed

        const hideUsersFromFeed = new Set()

        connectionRequests.forEach(req => {
            hideUsersFromFeed.add(req.fromUserId.toString())
            hideUsersFromFeed.add(req.toUserId.toString())
        })
        // hideUsersFromFeed -> id of the people whom i dont want to see in my feed


        const feed = await User.find(
            {
                $and: [
                    { _id: { $nin: Array.from(hideUsersFromFeed) } },
                    { _id: { $ne: loggedInUser.id } }
                ]
            }
        )
            .select("fullName About PhotoURL")
        res.status(200).json(feed);

    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

module.exports = { userRouter };
