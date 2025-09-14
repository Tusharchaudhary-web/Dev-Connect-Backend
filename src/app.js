const express = require('express');
const { DBConnect } = require("./config/database");
const cookieParser = require('cookie-parser');
const { authRouter } = require('./routes/auth');
const { profileRouter } = require('./routes/profile');
const { requestRouter } = require('./routes/requests');
const { userRouter } = require('./routes/user');
const cors =require('cors');


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173/" ,
    credentials:true   // The backend should know where your frontend is hosted , whitelisting the domain 
}));

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

DBConnect().then(() => {
    console.log("✅ Connected to Database successfully");
    app.listen(3000, () => {
        console.log("🚀 Server is successfully running at the port 3000");
    });
})
    .catch(() => {
        console.log("❌ Failed to connect to Database");
    });

