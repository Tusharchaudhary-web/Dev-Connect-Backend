// const express = require('express');
// const { DBConnect } = require('./config/database');
// const { User } = require("./models/user");

// const app = express();

// app.use(express.json());

// app.use("/signup", async (req, res) => {
//     try {
//         const user = new User(req.body);
//         await user.save();
//         res.json({ message: "user added sucessfully" });
//     }
//     catch (err) {
//         res.json({ message: err.message });
//     }
// })

// // how to get profile

// app.get("/user", async (req, res) => {
//     try {
//         const user = await User.findOne({ Email: req.body.Email });
//         if (!user) {
//             res.send("No user is found");
//         }
//         else {
//             res.send(user);
//         }
//     }
//     catch (err) {
//         res.status(400).json({ message: err.message });
//     }

// })


// // how to get all profiles

// app.get("/users", async (req, res) => {
//     try {
//         const user = await User.find({});
//         if (user.length === 0) {
//             res.send("No user is found");
//         }
//         else {
//             res.send(user);
//         }
//     }
//     catch (err) {
//         res.status(400).json({ message: err.message });
//     }

// })

// // how to delete profile


// app.delete("/delete", async (req, res) => {
//     try {
//         const user = await User.findOneAndDelete({ Email: req.body.Email });
//         if (!user) {
//             res.json({ message: 'user is not found' });
//         }
//         else {
//             res.json({ message: "user added sucessfully", user });
//         }
//     }
//     catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// })

// // how to delete all profiles


// app.delete("/deleteMany", async (req, res) => {
//     try {
//         const user = await User.deleteMany({});
//         if (user.deletedCount === 0) {
//             res.json({ message: 'user is not found' });
//         }
//         else {
//             res.json({ message: "All users has been deleted sucessfully", user });
//         }
//     }
//     catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// })



// app.patch("/update/:id", async (req, res) => {
//     try {
//         const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!user) {
//             res.json({ message: 'user is not found' });
//         }
//         else {
//             res.json({ message: 'user has been updated succesfully', user });
//         }
//     }
//     catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// })


// DBConnect().then(() => {
//     console.log("✅ Connected to Database successfully");
//     app.listen(3000, () => {
//         console.log("🚀 Server is successfully running at the port 3000");
//     });
// })
//     .catch(() => {
//         console.log("❌ Failed to connect to Database");
//     });


// app.post('/user',(req,res)=>{
//     try{
//         const { fullName}=req.body;
//         if(fullName.length<3 || fullName.length>30){
//             res.status(422).json({message:'invalid name'});
//         }
//         res.status(200).json({message:'data updated'});
//     }
//     catch(err){
//         res.status(400).json(err.message);
//     }
// })



// API versioning means when you make changes to your API (for example, adding new fields or changing response format), older clients using your old API should still work without errors

// Suppose you deployed your Node.js application, and suddenly it starts crashing with "out of memory" errors. What steps would you take to debug and fix the issue?

// Suppose two users try to update the same record in your database at the same time. How would you prevent data inconsistency?