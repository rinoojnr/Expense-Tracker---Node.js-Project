const express = require('express');

const signUpController = require('../controllers/signup');


const router = express.Router();

router.post('/user/signup',signUpController.signUp);




module.exports = router;