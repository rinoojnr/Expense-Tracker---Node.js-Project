const express = require('express');

const purchaseController = require('../controllers/purchase');
const authentication = require('../middileware/authentication');


const router = express.Router();


router.get('/premium/purchase',authentication.authentication,purchaseController.purchasepremium);
router.post('/premium/purchaseu',authentication.authentication,purchaseController.updateTransaction);
router.get('/premium/leaderboard',authentication.authentication,purchaseController.getLeaderBoard)


module.exports = router;