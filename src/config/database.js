const mongoose = require('mongoose');

const DBConnect = async () => {
    await mongoose.connect(process.env.MONGO_URI);
}

module.exports = { DBConnect };

