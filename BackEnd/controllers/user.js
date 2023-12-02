const Users = require('../models/signup');

exports.signUp = async(req,res)=>{
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
}

exports.login = async(req,res) =>{
    console.log(req.body,"============");
    let data = await Users.findAll({where: {useremail:req.body.email}});
    console.log(data)
    if(data.length===0){
        res.status(404).json("User not found");
    }else{
        if(data[0].userpassword != req.body.password){
            res.status(401).json("User not authorized")
        }else{
            res.status(201).json(`${data[0].username} is Login Successfully`)
        }
        
    }
    
}