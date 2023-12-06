const jsw = require('jsonwebtoken');

const Expense = require('../models/addexpense');
const User = require('../models/signup');

exports.addExpense = async(req,res) =>{
    const { amount, description, category} = req.body;
    const expenseData = await Expense.create({amount,description,category,userId:req.user.id});
    const totalexpense = Number(req.user.totalexpense)+Number(amount);
    User.update({
        totalexpense: totalexpense
    },{
        where: {id:req.user.id}
    })

    res.status(201).json(expenseData)
}

exports.getExpense = async(req,res)=>{
    let expenseData = await Expense.findAll({where: {userId:req.user.id}});
    res.json(expenseData);
}

exports.deleteExpense = async(req,res) =>{
    Expense.destroy({where: {id: req.params.id,userId: req.user.id}})
    .then((noofrow)=>{
        if(noofrow === 0){
            res.status(404).json({"success":false,"message":"The expense is not yours"})
        }else{
            res.status(200).json({"success":true,"message":"Deleted"})
        }
    }).catch((err=>{

    }))

}