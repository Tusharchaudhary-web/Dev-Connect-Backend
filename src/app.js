require('dotenv').config();

const express = require('express');
const { DBConnect } = require("./config/database");
const cookieParser = require('cookie-parser');
const { authRouter } = require('./routes/auth');
const { profileRouter } = require('./routes/profile');
const { requestRouter } = require('./routes/requests');
const { userRouter } = require('./routes/user');
const cors = require('cors');
const app = express();

const http = require('http');
const initializeSocket = require('./utils/socket');

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173', // allow your frontend
    credentials: true
}));

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);


const server = http.createServer(app);

initializeSocket(server);

DBConnect().then(() => {
    console.log("✅Connected to Database successfully");
    app.listen(process.env.PORT, () => {
        console.log("🚀 Server is successfully running at the port 3000");
    });
})
    .catch(() => {
        console.log("❌ Failed to connect to Database");
    });

