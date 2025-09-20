const validateUserProfile = (req, res,next) => {
    const updateAllowed = ["fullName", "About", "PhotoURL"];
    const isUpdateAllowed = Object.keys(req.body).every(key => updateAllowed.includes(key));
    if(!isUpdateAllowed){
       return res.status(403).json({message:'Update is not allowed'});
    }
    next();
}

module.exports={validateUserProfile};