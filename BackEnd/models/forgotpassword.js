const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const Fpassword = sequelize.define('ForgotPasswordRequests',{
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    active:Sequelize.BOOLEAN,


})

module.exports = Fpassword;