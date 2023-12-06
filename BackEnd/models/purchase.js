const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const Purchase = sequelize.define("purchase",{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    paymentid: Sequelize.STRING,
    orderid: Sequelize.STRING,
    status: Sequelize.STRING,
})

module.exports = Purchase;