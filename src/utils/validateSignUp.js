const validator = require('validator');

const validateSignUp = (req) => {

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
        throw new Error('Name is required');
    }
    else {
        if (!validator.isAlpha(fullName, "en-US", { ignore: " `.-" }))
            throw new Error('Name should only contain letters');
        else if (fullName.length < 3 || fullName.length > 30)
            throw new Error('Name should be between 3 and 30 characters');
    }

    if (!Email) {
        throw new Error('Email is required');
    }
    else {
        if (!validator.isEmail(Email)) {
            throw new Error("Kindly enter valid email");
        }
    }
    if (!Password) {
        throw new Error('Password is required');
    }
    else {
        if (!validator.isStrongPassword(Password)) {
            throw new Error("Your password is too weak , please Enter strong password")
        }
    }
    if (!ConfirmPassword) {
        throw new Error('Confirm Password is required');
    }
    else {
        if (Password !== ConfirmPassword)
            throw new Error('Your password and confirm password do not match.');

    }


}
module.exports = { validateSignUp };














