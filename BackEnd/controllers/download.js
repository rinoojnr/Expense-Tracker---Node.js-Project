

const Expense = require('../models/addexpense');
const S3services = require('../services/S3service');





exports.downLoad = async(req,res) =>{
    try{
        const expense = await Expense.findAll({where: {userId:req.user.id}});
        const stringifiedExpense = JSON.stringify(expense);
        const userId = req.user.id;
        const filename = `Expense${userId}/${new Date()}.txt`;
        const fileUrl = await S3services.uploadToS3(stringifiedExpense,filename);
        res.status(200).json({fileUrl,success:true,err:null})
    }catch(err){
        res.status(500).json({fileUrl:'',success:false,err:err,message:"Please Try The Premium"})
    }
    if(req.user.isPremium === true){
        console.log(req.user)
        
    }else{
        
    }
    
}