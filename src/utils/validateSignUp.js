const validator = require('validator');

const validateSignUp = (req, res, next) => {

    if (req.body.fullName) {
        req.body.fullName = req.body.fullName.trim();
    }
    if (req.body.Email) {
        req.body.Email = validator.normalizeEmail(req.body.Email);
    }
    if (req.body.Password) {
        req.body.Password = req.body.Password.trim();
    }

    const { fullName, Email, Password, ConfirmPassword } = req.body;

    if (!fullName) {
        return res.status(400).json({ message: 'Name is required' });
    } else {
        if (!validator.isAlpha(fullName, "en-US", { ignore: " `.-" })) {
            return res.status(400).json({ message: 'Name should only contain letters' });
        } else if (fullName.length < 3 || fullName.length > 30) {
            return res.status(400).json({ message: 'Name should be between 3 and 30 characters' });
        }
    }

    if (!Email) {
        return res.status(400).json({ message: 'Email is required' });
    } else {
        if (!validator.isEmail(Email)) {
            return res.status(400).json({ message: "Kindly enter valid email" });
        }
    }

    if (!Password) {
        return res.status(400).json({ message: 'Password is required' });
    } else {
        if (!validator.isStrongPassword(Password)) {
            return res.status(400).json({ message: "Your password is too weak, please enter a strong password" });
        }
    }

    if (!ConfirmPassword) {
        return res.status(400).json({ message: 'Confirm Password is required' });
    } else {
        if (Password !== ConfirmPassword) {
            return res.status(400).json({ message: 'Your password and confirm password do not match.' });
        }
    }
    next();
}

module.exports = { validateSignUp };
