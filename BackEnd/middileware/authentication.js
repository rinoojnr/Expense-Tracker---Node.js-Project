const jsw = require('jsonwebtoken');

const User = require('../models/signup');



const authentication = (req,res,next) =>{
    const token = req.header("Authentication");
    const user = jsw.verify(token,"strongpassword");
    User.findByPk(user.userId).then((user)=>
    {
        req.user = user;
        next();
    }).catch(err=>console.log(err));
    
}


module.exports ={
    authentication
}