const bcrypt = require('bcrypt');

const Users = require('../models/signup');

exports.signUp = async(req,res)=>{
    const userName = req.body.name;
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    let saltrounds = 10;
    let passwordHash = await bcrypt.hash(userPassword,saltrounds);

    try{
        const data = await Users.create({
            username: userName,
            useremail: userEmail,
            userpassword: passwordHash
        });
        res.status(200).json(data);
    }catch(err){
        res.status(403).json("Email address already in use!")
    }   
}

exports.login = async(req,res) =>{
    console.log(req.body,"============");
    let data = await Users.findAll({where: {useremail:req.body.email}});
    if(data.length === 0){
        res.status(404).json({success:false,message:"User not found"})
    }else{
        bcrypt.compare(req.body.password,data[0].userpassword,(err,result)=>{
            console.log(data[0])
            if(result === true){
                res.status(200).json({success:true,message:`${data[0].username} is login successfully`});
            }else{
                res.status(400).json({success:false,message:"Password is incorrect"});
            } 
        })
    }
    
    // console.log(data)
    // if(data.length===0){
    //     res.status(404).json("User not found");
    // }else{
    //     if(data[0].userpassword != req.body.password){
    //         res.status(401).json("Password Is Incorrect")
    //     }else{
    //         res.status(201).json(`${data[0].username} is Login Successfully`)
    //     }
        
    // }
    
}