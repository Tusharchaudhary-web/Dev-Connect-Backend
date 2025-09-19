const express = require('express');
const { ConnectionRequest } = require("../models/connectionRequest");
const { userAuth } = require("../middlewares/userAuth");
const { User } = require("../models/user");


const requestRouter = express.Router();


// Steps to Send a Successful Connection Request
// 1️⃣ Authenticate logged-in user (fromUser)
// 2️⃣ Check if toUser exists
// 3️⃣ Validate status (ignored / interested)
// 4️⃣ Prevent self-request (fromUser ≠ toUser)
// 5️⃣ Check if request already exists (direct or reverse)
// 6️⃣ Save in DB and send response

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

        // if (fromUserId.toString() === toUserId.toString()) {
        //     return res.status(400).json({ message: 'you cannot send request to self' });
        // }

        const existRequest = await ConnectionRequest.findOne({
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
            return res.status(409).json({ message: 'Request already exist' });
        }
        const connectionReq = new ConnectionRequest({ fromUserId, toUserId, status });
        await connectionReq.save();
        res.status(200).json({ message: `${req.user.fullName} sents a connection request to ${toUser.fullName}` });

    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

// Steps of reviewing a request
// Validate the status → must be "accepted" or "rejected".
// Check if the request document exists by requestId.
// Ensure request status is still "interested" → only then it can be reviewed.
// Check authorization → toUserId (in document) must match loggedInUserId (reviewer).
// Update the status → change to "accepted" or "rejected".
// Save & respond → send success message.

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;
        const status = req.params.status;
        const requestId = req.params.requestId;

        const allowedStatus = ['accepted', 'rejected'];
        if (!allowedStatus.includes(status)) {
            return res.status(403).json({ message: `Invalid status ${status} ` })
        }

        const existRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser.id,
            status: "interested"
        })

        if (!existRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }

        existRequest.status = status;
        await existRequest.save();
        res.status(200).json({ message: `Request ${status}` })

    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
})



module.exports = { requestRouter };


