const express = require('express');

const passwordController = require('../controllers/password');


const router = express.Router();

router.post('/password/forgotpassword',passwordController.forgotpassword);
router.use('/password/resetpassword/:id',passwordController.restPassword);
router.use('/password/updatepassword/:id',passwordController.updatePassword);



module.exports = router;