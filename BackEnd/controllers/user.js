const bcrypt = require('bcrypt');
const jsw = require('jsonwebtoken');

const Users = require('../models/signup');

signUp = async(req,res)=>{
    const userName = req.body.name;
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    let saltrounds = 10;
    let passwordHash = await bcrypt.hash(userPassword,saltrounds);

    try{
        const data = await Users.create({
            username: userName,
            useremail: userEmail,
            userpassword: passwordHash,
            isPremium: false
        });
        res.status(200).json(data);
    }catch(err){
        res.status(403).json({success:false,message: "Email address already in use!"})
    }   
}

auth = (id,isPremium) =>{
    return jsw.sign({userId: id,isPremium: isPremium},"strongpassword");
}


login = async(req,res) =>{
    try{
        console.log(req.body,"============");
        let data = await Users.findAll({where: {useremail:req.body.email}});
        if(data.length === 0){
            res.status(404).json({success:false,message:"User not found"})
        }else{
            bcrypt.compare(req.body.password,data[0].userpassword,(err,result)=>{
                if(result === true){
                    res.status(200).json({success:true,message:`${data[0].username} is login successfully`,token:auth(data[0].id,data[0].isPremium)});
                    
                }else{
                    res.status(400).json({success:false,message:"Password is incorrect"});
                } 
            })
        }
    }catch(err){
        res.status(400).json({success:false,message:"Error"})
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

module.exports = {
    auth,login,signUp
}