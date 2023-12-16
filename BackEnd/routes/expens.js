const express = require('express');

const expenseController = require('../controllers/expense');
const authentication = require('../middileware/authentication');

const router = express.Router();

router.post('/expense/addexpense',authentication.authentication,expenseController.addExpense);
router.get('/expense/getexpense/',authentication.authentication,expenseController.getExpense);
router.delete('/expense/deleteexpense/:id',authentication.authentication,expenseController.deleteExpense);


module.exports = router;