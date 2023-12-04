const express = require('express');

const purchaseController = require('../controllers/purchase');
const authentication = require('../middileware/authentication');


const router = express.Router();


router.get('/payment/purchasepremium',authentication.authentication,purchaseController.purchasepremium);
router.post('/payment/purchasepremiumupdate',authentication.authentication,purchaseController.updateTransaction);


module.exports = router;