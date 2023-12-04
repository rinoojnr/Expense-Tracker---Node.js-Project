const jsw = require('jsonwebtoken');

const User = require('../models/signup');



const authentication = (req,res,next) =>{
    const token = req.header("Authentication");
    const user = jsw.verify(token,"strongpassword");
    User.findByPk(user).then((user)=>
    {
        req.user = user;
        next();
    }).catch(err=>console.log(err));
    
}

const userid = (req,res,next) =>{
    const user = jsw.verify(req.body.userId,"strongpassword");
    req.id = user
    next()
}


module.exports ={
    authentication,userid
}