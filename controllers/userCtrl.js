const formidable = require('formidable')
const Match = require('../models/Match')

/**
 *GET show user dashboard
 */
exports.showDashboard = (req,res) =>{
    res.render('index', {
        column:'myTournament'
    })
}

/**
 * show tournament list
 */
exports.showMatchList = (req,res) =>{
    //get tournament list from db
    Match.find({}, (err, matches) => {
        if(err){
            return res.send('-2') //server error
        }

        res.render('index', {
            column:'myTournament',
            matches: matches
        })
    })

}

/**
 * post add tournament to db
 */
exports.addTournament = (req,res) => {
    let match = new Match({
        mName: req.body.mName,
        mNumber:req.body.mNumber,
        mPlayers:req.body.mPlayers,
        mActiveTime:req.body.mActiveTime,
        mWinner:req.body.mWinner,
        mDescription:req.body.mDescription
    })

    match.save().then(()=>{
        //add successfully
        return res.send('1')
    })

}

/**
 * show modify match page
 * */
exports.showModifyTournament = (req,res) => {
    let mId = req.params._Id
    Match.find({_id:mId}, (err, matches) => {
        if(err){
            return res.send('-2') //server error
        }
        res.render('modify', {
            column:'myTournament',
            match: matches[0]
        })
    })

}

/**
 * do modify tournament info
*/
exports.doModifyTournament = (req,res) => {
    Match.find({_id:req.body.mId}, (err, matches) =>{
        if(err){
            return res.send('-2') //server error
        }
        matches[0].mName = req.body.mName
        matches[0].mNumber = req.body.mNumber
        matches[0].mPlayers = req.body.mPlayers
        matches[0].mActiveTime = req.body.mActiveTime
        matches[0].mWinner = req.body.mWinner
        matches[0].mDescription = req.body.mDescription

        matches[0].save().then(()=>{
            return res.send('1') //modify successfully
        })

    })
}

/**
 * delete selected tournament
 */
exports.deleteTournament = (req,res) => {
    Match.find({_id:req.params._Id},(err,matches) => {
        if(err){
            //server error
            return res.send('-2')
        }
        matches[0].remove().then(()=>{
            //delete successfully
            res.redirect('/users/')
        })
    })
}

/**
 * Show login form
 */
exports.showLogin = (req,res) => {
    return res.render('home', {
        show: 'login'
    })
}

/**
* Show register form
* */
exports.showRegister = (req,res) => {
    return res.render('home', {
        show: 'register'
    })
}