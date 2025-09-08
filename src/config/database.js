const mongoose = require('mongoose');

const DBConnect = async () => {
    await mongoose.connect(
        "mongodb+srv://Tusharchaudhary:create12345@tushar-nodejs.qnz3sxu.mongodb.net/DevConnect");
}

module.exports = { DBConnect };

