const Users = require('../models/signup');

exports.signUp = (async(req,res)=>{
    const userName = req.body.name;
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    try{
        const data = await Users.create({
            username: userName,
            useremail: userEmail,
            userpassword: userPassword
        });
        res.status(200).json(data);
    }catch(err){
        res.status(403).json("Email address already in use!")
    }

    

    
})