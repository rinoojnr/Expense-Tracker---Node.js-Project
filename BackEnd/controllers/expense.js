const jsw = require('jsonwebtoken');


const Expense = require('../models/addexpense');
const User = require('../models/signup');
const sequelize = require('../util/database');

exports.addExpense = async(req,res) =>{
    const t = await sequelize.transaction();
    try{
        const user = req.user;
        const { amount, description, category} = req.body;
        const count = await Expense.count({where: {userId:req.user.id}}); 
        const expenseData = await Expense.create({amount,description,category,userId:req.user.id},{transaction: t});
        const totalexpense = Number(req.user.totalexpense)+Number(amount);
        await User.update({
            totalexpense: totalexpense
        },{
            where: {id:req.user.id},
            transaction: t 
        })
            await t.commit();
            res.status(201).json({expenses:expenseData})
    }catch(err){
        await t.rollback();
        res.status(500).json({success:false,error:err})
    }
    //

    
}

exports.getExpense = async(req,res)=>{
    const user = req.user;
    const page = JSON.parse(req.query.page); 
    let limit = JSON.parse(req.query.limit) || 5;
    const offset = (page - 1) * limit; 
    const count = await Expense.count({where: {userId:req.user.id}}); 
    let expenseData = await user.getExpenses({offset: offset,limit: limit,order: [
        ['createdAt', 'DESC']]});
    res.json({
        expenses:expenseData,
        curendPage: page,
        hasPrevPage: page > 1,
        hasNextPage: limit * page < count
    });
}

exports.deleteExpense = async(req,res) =>{
    try{
        const totalExpenseBefore = req.user.totalexpense;
        const amount = await Expense.findOne({attributes: ['amount'],where: {id: Number(req.params.id)}})
        const updatedTotalExpense = Number(totalExpenseBefore) - Number(amount.amount);
        Expense.destroy({where: {id: req.params.id,userId: req.user.id}})
        .then((noofrow)=>{
            if(noofrow === 0){
                res.status(404).json({"success":false,"message":"The expense is not yours"})
            }else{
                User.update({
                    totalexpense: updatedTotalExpense
                },{where: {id:req.user.id}})
                res.status(200).json({"success":true,"message":"Deleted"})
            }
        }).catch((err=>{
            throw new Error('something went wrong');
        }))
    }catch(err){
        res.status(400).json({success:false,message:"something went wrong,can't delete the expense"});
    }
}