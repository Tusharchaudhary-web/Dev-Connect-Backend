const express = require('express');
const {userAuth} = require('../middlewares/userAuth');
const Chat = require('../models/chat');

const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId",userAuth,async(req,res)=>{
try{
const {targetUserId}=req.params;
const userId = req.user._id;

let chat = await Chat.findOne({
    participants:{$all:[userId, targetUserId]}
}).populate({
        path:"messages.senderId",
        select:"fullName"
    })
if(!chat){
    chat = new Chat({
        participants:[userId,targetUserId],
        messages:[]
    })
    await chat.save();
}
    res.json(chat);
}
catch(err){
return res.status(500).json({message:err.message});
}
})

module.exports={chatRouter};