const Razorpay = require('razorpay');

const Purchase = require('../models/purchase');

const purchasepremium = async(req,res) =>{
    try{
        var rzp = new Razorpay({
            key_id: 'rzp_test_DqjWZYpFuc6765',
            key_secret: 'jRLGvPwC9KsFnDZgl4JF1yq4'
        })
        
        const amount = 2500;
        
        
        rzp.orders.create({amount,currency:"INR"},(err,order)=>{
            if(err){
                throw new Error(err)
            }
            req.user.createPurchase({orderid: order.id,status: "PENDING"}).then(()=>{
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
        Purchase.findOne({where: {orderid: order_id,status: "SUCCESSFULL"}}).then(()=>{
            req.user.update({isPremium: true}).then(()=>{
                res.status(202).json({sucess: true,message: "Transaction Successful"});
            }).catch((err)=>{
                throw new Error(err)
            })
        }).catch(err=> {
            throw new Error(err)
        })
    }catch(err){
        console.log(err)

    }
}



module.exports ={
    updateTransaction,purchasepremium
}