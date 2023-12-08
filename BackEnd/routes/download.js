const express = require('express');

const authentication = require('../middileware/authentication');
const downLoadController = require('../controllers/download');

const router = express.Router();

router.get('/user/download/',authentication.authentication,downLoadController.downLoad);

module.exports = router;