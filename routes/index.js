const express = require('express')
const userCtrl = require('../controllers/userCtrl')
router = express.Router()

/* todo: GET render to login page*/
router.get('/', userCtrl.showLogin)



module.exports = router;
