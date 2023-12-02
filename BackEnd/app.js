const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./util/database');

const router = require('./routes/signup');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(router);


sequelize.sync()
.then((response)=>{
    app.listen(3000);
}).catch(err=>console.log(err));

