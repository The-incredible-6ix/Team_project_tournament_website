const express = require('express')
router = express.Router()
const userCtrl = require('../controllers/userCtrl')

/*GET /users/ show dashboard*/
// router.get('/', userCtrl.showDashboard)

/*GET /users/list  show tournaments list*/
router.get('/', userCtrl.showMatchList)

/*POST add tournament to db*/
router.post('/addTournament', userCtrl.addTournament)

/*GET /users/modifyTournament show modify tournament page*/
router.get('/modifyTournament/:_Id', userCtrl.showModifyTournament)

/*GET /users/modifyTournament do modify tournament page*/
router.post('/modifyTournament/', userCtrl.doModifyTournament)

/*GET /users/deleteTournament  delete selected tournament*/
router.get('/deleteTournament/:_Id', userCtrl.deleteTournament)

/*GET render login page*/
router.get('/login', userCtrl.showLogin)

/*GET render register page*/
router.get('/register', userCtrl.showRegister)

module.exports = router;
