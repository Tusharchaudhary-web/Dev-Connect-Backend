const validateUserProfile=(req)=>{
const allowedUpdates=['fullName','PhotoURL',"About",'Skills'];

const isallowedUpdate=Object.keys(req.body).every((key)=>allowedUpdates.includes(key));
return isallowedUpdate;
}

module.exports={validateUserProfile};


