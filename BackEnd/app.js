const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet  = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const sequelize = require('./util/database');

const User = require('./models/signup');
const Expense = require('./models/addexpense');
const Purchase =require('./models/purchase');

const userRouter = require('./routes/user');
const expenseRouter = require('./routes/expens');
const purchaseRouter = require('./routes/purchase');
const passwordRouter = require('./routes/password');
const downloadRouter = require('./routes/download');

const app = express();

const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };


const accessLogStream = fs.createWriteStream('access.log')

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('combined',{stream:accessLogStream}));


app.use(userRouter);
app.use(expenseRouter);
app.use(purchaseRouter);
app.use(passwordRouter);
app.use(downloadRouter);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Purchase)
Purchase.belongsTo(User)

sequelize.sync()
.then((response)=>{
    app.listen(process.env.PORT_NUMBER ||3000);
}).catch(err=>console.log(err));

