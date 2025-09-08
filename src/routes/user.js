const express = require('express');
const {User} = require('../models/user');

const userRouter = express.Router();

userRouter.post('/user/connections',(req,res)=>{

})

module.exports={userRouter};
