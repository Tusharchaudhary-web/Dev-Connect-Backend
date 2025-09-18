// Read the token from req.cookies , validate the token, find the user
// when any API call is made ,server read the token from cookies and validate the token to check who is loggedin


const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
           return res.status(401).json({message:'Please Login'});
        }

        const decodedObject = await jwt.verify(token, "Tushar@123");

        const { _id } = decodedObject;

        const user = await User.findById(_id);

        req.user = user;
        next();

    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
module.exports={userAuth};