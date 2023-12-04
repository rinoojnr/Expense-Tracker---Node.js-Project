const jsw = require('jsonwebtoken');

const Expense = require('../models/addexpense');

exports.addExpense = async(req,res) =>{
    const { amount, description, category} = req.body;
    const expenseData = await Expense.create({amount,description,category,userId:req.id});
    res.status(201).json(expenseData)
}

exports.getExpense = async(req,res)=>{
    let expenseData = await Expense.findAll({where: {userId: req.user.id}});
    res.json(expenseData);
}

exports.deleteExpense = async(req,res) =>{
    let deleteExpense = Expense.destroy({where: {id: req.params.id}});
    res.json("deleted")

}