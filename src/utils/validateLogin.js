
const validator = require("validator");

const validateLogin = (req, res,next) => {
    const { Email, Password } = req.body;

    if (!Email) {
        return res.status(401).json({ message: 'Email is required' });
    }

    if (!validator.isEmail(Email)) {
        return res.status(401).json({ message: 'Kindly enter valid Email' });
    }

    if (!Password) {
        return res.status(401).json({ message: 'Enter your password' });
    }
    next();
};

module.exports = { validateLogin };