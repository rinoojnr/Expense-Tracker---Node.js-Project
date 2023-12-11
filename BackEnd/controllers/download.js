

const Expense = require('../models/addexpense');
const S3services = require('../services/S3service');





exports.downLoad = async(req,res) =>{
    try{
        if(req.user.isPremium === true){
            const expense = await Expense.findAll({where: {userId:req.user.id}});
            const stringifiedExpense = JSON.stringify(expense);
            const userId = req.user.id;
            const filename = `Expense${userId}/${new Date()}.txt`;
            const fileUrl = await S3services.uploadToS3(stringifiedExpense,filename);
            res.status(200).json({fileUrl,success:true,err:null})
        }else{
            throw new Error()
        }
        
    }catch(err){
        res.status(404).json({fileUrl:'',success:false,err:err,message:"Please Try The Premium"})
    } 
}