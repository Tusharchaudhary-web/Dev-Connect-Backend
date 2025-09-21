const mongoose = require('mongoose');
require('dotenv').config();

const DBConnect = async () => {
    await mongoose.connect(process.env.MONGO_URI);
}

module.exports = { DBConnect };

