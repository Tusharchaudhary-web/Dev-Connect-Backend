const express = require('express');
const { ConnectionRequestModel } = require("../models/connectionRequest");
const { userAuth } = require("../middlewares/userAuth");
const { User } = require("../models/user");

const requestRouter = express.Router();

requestRouter.post('/request/send/:status/:toUserId', userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;   // it is loggedInUser who will sent the request
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ['ignored', 'interested'];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: `Invalid status type ${status}` });
        }

        const toUser = await User.findById(toUserId);
        if (!toUser) {
            if (!toUser) return res.status(404).json({ message: 'user not found' });
        }

        if (fromUserId.toString() === toUserId.toString()) {
            return res.status(400).json({ message: 'you cannot send request to self' });
        }

        const existRequest = await ConnectionRequestModel.findOne({
            $or: [
                {
                    fromUserId: fromUserId, toUserId: toUserId
                },
                {
                    fromUserId: toUserId, toUserId: fromUserId
                }
            ]
        })
        if (existRequest) {
            return res.status(400).json({ message: 'Request already exist' });
        }


        const connectionRequest = new ConnectionRequestModel({ fromUserId, toUserId, status });
        await connectionRequest.save();
        res.json({ message: `${req.user.fullName} sents a connection request to ${toUser.fullName}` });

    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
})


module.exports = { requestRouter };


// Steps to Send a Successful Connection Request
// 1️⃣ Authenticate logged-in user (fromUser)
// 2️⃣ Check if toUser exists
// 3️⃣ Validate status (ignored / interested)
// 4️⃣ Prevent self-request (fromUser ≠ toUser)
// 5️⃣ Check if request already exists (direct or reverse)
// 6️⃣ Save in DB and send response
