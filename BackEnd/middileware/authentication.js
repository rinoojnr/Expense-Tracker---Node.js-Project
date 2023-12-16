const jsw = require('jsonwebtoken');

const User = require('../models/signup');



const authentication = async(req,res,next) =>{
    try{
        const token = req.header("Authentication");
        const decoded = jsw.verify(token,"strongpassword");
        const user = await User.findByPk(decoded.userId)
        req.user = user;
        next();
    }catch(err){
        res.status(400).json({success:false,message:"Authentication denied"})
    }
    
    
}


module.exports ={
    authentication
}