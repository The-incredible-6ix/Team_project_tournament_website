let express = require('express')
let router = express.Router()
let mongoose = require('mongoose');

let passport = require('passport');

let matchesController = require('../controllers/matches')

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/*GET /users/ show dashboard*/
// router.get('/', matchesController.showDashboard)

/*GET show tournaments list*/
router.get('/', matchesController.showMatchList)

/*GET show tournaments management list*/
router.get('/management', matchesController.showMatchManagementList)

/*POST add tournament to db*/
router.post('/addTournament', requireAuth, matchesController.addTournament)

/*GET /users/modifyTournament show modify tournament page*/
router.get('/modifyTournament/:_Id', requireAuth, matchesController.showModifyTournament)

/*GET /users/modifyTournament do modify tournament page*/
router.post('/modifyTournament/', requireAuth, matchesController.doModifyTournament)

/*GET /users/deleteTournament  delete selected tournament*/
router.get('/deleteTournament/:_Id', requireAuth, matchesController.deleteTournament)

/*POST select winner*/
router.post('/winnerSelect/', requireAuth, matchesController.doSelectWinner)


module.exports = router;
