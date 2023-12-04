const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./util/database');

const User = require('./models/signup');
const Expense = require('./models/addexpense');
const Purchase =require('./models/purchase');

const userRouter = require('./routes/user');
const expenseRouter = require('./routes/expens');
const purchaseRouter = require('./routes/purchase');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(userRouter);
app.use(expenseRouter);
app.use(purchaseRouter);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Purchase)
Purchase.belongsTo(User)

sequelize.sync()
.then((response)=>{
    app.listen(3000);
}).catch(err=>console.log(err));

