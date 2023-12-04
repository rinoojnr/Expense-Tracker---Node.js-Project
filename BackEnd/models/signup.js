const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Users = sequelize.define('users',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    useremail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            args:true,
            msg: 'Email address already in use!'
        }
    },
    userpassword: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isPremium: Sequelize.BOOLEAN
});

module.exports = Users;