const validator = require("validator");

const validateLogin = (req) => {
    const { Email, Password } = req.body;

    if (!Email) {
        throw new Error("Email is required");
    }
    else {
        if (!validator.isEmail(Email)) {
            throw new Error('kindly enter valid Email');
        }
    }
    if (!Password) {
        throw new Error("Enter your password");
    }
}

module.exports = { validateLogin };