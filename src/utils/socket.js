// // How to initialize a Socket

// const socket = require('socket.io');

// const initializeSocket = (server) => {

//     const io = socket(server, {
//         cors: {
//             origin: "http://localhost:5173"
//         }
//     })

//     io.on("connection", (socket) => {
//         socket.on('joinChat', ({ fullName, userId, targetUserId }) => {
//             const roomId = [userId, targetUserId].sort().join('-');
//             console.log(`${fullName} joined the chat ${roomId}`);
//             socket.join(roomId);
//         })

//         socket.on('sendMessage', ({ fullName, userId, targetUserId, text }) => {
//             console.log(fullName + " " + text)
//             const roomId = [userId, targetUserId].sort().join('-');
//             io.to(roomId).emit("messageReceived", { fullName, text })

//         })

//     })

// }



const socket = require('socket.io');

const initializeSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173"
        }
    })

    io.on("connection", (socket) => {
        socket.on("joinChat", ({ fullName, userId, targetUserId }) => {
            const uniqueId = [userId, targetUserId].sort().join('-');
            console.log(`${fullName} joined the chat room ${uniqueId}`);
            socket.join(uniqueId);
        })

        socket.on("sendMessage", ({ fullName, userId, targetUserId, text }) => {
            const uniqueId = [userId, targetUserId].sort().join('-');
            io.to(uniqueId).emit("messageReceived", { fullName, text });
            //    socket.emit("messageReceived", { fullName, text });
        })
    })
}

module.exports = initializeSocket;