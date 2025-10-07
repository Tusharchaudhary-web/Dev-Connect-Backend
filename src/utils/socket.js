// How to initialize a Socket

const socket = require('socket.io');

const Chat = require("../models/chat");
const { ConnectionRequest } = require('../models/connectionRequest');


const initializeSocket = (server) => {

    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173"
        }
    })

    io.on("connection", (socket) => {
        socket.on('joinChat', ({ fullName, userId, targetUserId }) => {
            const roomId = [userId, targetUserId].sort().join('-');
            // console.log(`${fullName} joined the chat ${roomId}`);
            socket.join(roomId);
        })

        socket.on('sendMessage', async ({ fullName, userId, targetUserId, text }) => {
            try {
                const roomId = [userId, targetUserId].sort().join('-');
                // const roomId = getSecretRoomId(userId, targetuserId);
                // save messages to the database
                // when i will receive messages so i need to findout this chat exist earlier
                // if it exist push there , if not create it

                //first check if userId and targetUserid are friends

                ConnectionRequest.findOne()

                let chat = await Chat.findOne({
                    participants: { $all: [userId, targetUserId] }
                })
                // if chat doesn't exist create new chat
                if (!chat) {
                    chat = new Chat({
                        participants: [userId, targetUserId],
                        messages: []
                    })
                }
                chat.messages.push({
                    senderId: userId,
                    text
                })
                await chat.save();

                io.to(roomId).emit("messageReceived", { fullName, text })
            }
            catch (err) {
                console.log(err);
            }

        })

    })

}

module.exports = initializeSocket;