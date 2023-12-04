const express = require('express');

const expenseController = require('../controllers/expense');
const authentication = require('../middileware/authentication');

const router = express.Router();

router.post('/expense/addexpense',authentication.userid,expenseController.addpackage.jsonExpense);
router.get('/expense/getexpense',authentication.authentication,expenseController.getExpense);
router.delete('/expense/deleteexpense/:id',expenseController.deleteExpense);


module.exports = router;