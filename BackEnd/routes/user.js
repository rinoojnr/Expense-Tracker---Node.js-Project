const express = require('express');

const userController = require('../controllers/user');
const authentication = require('../middileware/authentication');


const router = express.Router();

router.post('/user/signup',userController.signUp);
router.post('/user/login',userController.login);




module.exports = router;