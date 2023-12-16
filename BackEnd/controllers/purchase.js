const Razorpay = require('razorpay');

const Purchase = require('../models/purchase');
const Expense = require('../models/addexpense');
const User = require('../models/signup');

const auth = require('../controllers/user');
const sequelize = require('../util/database');


const purchasepremium = async(req,res) =>{
    try{
        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        
        const amount = 2500;
        
        
        rzp.orders.create({amount,currency:"INR"},(err,order)=>{
            if(err){
                throw new Error(err)
            }
            req.user.createPurchase({orderid: order.id,status: "FAILED"}).then(()=>{
                return res.status(201).json({order,key_id: rzp.key_id});
            }).catch(err=>{
                throw new Error(err)
            })
        })
    }catch(err){
        console.log(err)
    }
}

const updateTransaction = async(req,res) =>{
    try{
        const { payment_id, order_id } = req.body;
        const order = await Purchase.findOne({where: {orderid: order_id}});
        const promise1 = order.update({paymentid: payment_id,status: "SUCCESSFUL"})
        const promise2 = req.user.update({isPremium: true});
        Promise.all([promise1,promise2]).then(()=>{
            res.status(202).json({sucess: true,message: "Transaction Successful",token: auth.auth(order.userId,true)});
        }).catch((err)=>{
            throw new Error(err);
        })           
    }catch(err){
        console.log(err)

    }
}

const getLeaderBoard = async(req,res) =>{
    // const expense = await Expense.findAll();
    // const user = await User.findAll();
    
    // const user = await User.findAll({
    //     attributes: ['id','username',[sequelize.fn('sum',sequelize.col('expenses.amount')),'total_cost']],
    //     include: [
    //         {
    //             model: Expense,
    //             attributes: [] 
    //         }
    //     ],
    //     group: ['users.id'],
    //     order: [['totalexpense',"DESC"]]
    // })
    const user = await User.findAll({attributes: ['username','totalexpense'], order: [['totalexpense', 'DESC']]});
    res.json(user)

}



module.exports ={
    updateTransaction,purchasepremium,getLeaderBoard
}