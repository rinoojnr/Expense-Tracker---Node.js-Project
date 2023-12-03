const express = require('express');

const expenseController = require('../controllers/expense');

const router = express.Router();

router.post('/expense/addexpense',expenseController.addExpense);
router.get('/expense/getexpense',expenseController.getExpense);
router.delete('/expense/deleteexpense/:id',expenseController.deleteExpense);


module.exports = router;