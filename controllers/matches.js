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

        //create a color at random
        let colorObj={
            r : Math.floor(Math.random()*255),
            g : Math.floor(Math.random()*255),
            b : Math.floor(Math.random()*255),
            a : 0.8
        }

        //get the first letter of the username
        let firstLetter = req.session.username!==undefined?req.session.username.substring(0,1):''
        

        res.render('index', {
            column:'myTournament',
            matches: matches,
            color: colorObj,
            firstLetter:firstLetter,
            login: req.session.login,
            displayName: req.user ? req.user.displayName : ''
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
        mPlayers:req.body.mPlayers.split(','),
        mActiveTime:req.body.mActiveTime,
        mWinner:req.body.mWinner,
        mOwner: req.session.displayName,
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
        console.log(matches[0])
        res.render('modify', {
            column:'tournamentList',
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
        console.log(req.body.mWinner)
        matches[0].mName = req.body.mName
        matches[0].mNumber = req.body.mNumber
        matches[0].mPlayers = req.body.mPlayers.split(',')
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
            // res.redirect('/matches')
            return res.send('1')
        })
    })
}

/**
 * show tournament management window
 */
exports.showMatchManagementList = (req,res) => {
    if(!req.session.username){
        res.render('manage', {
            column:'manageTournament',
            login: false,
        })
    }
console.log(req.session.displayName)
    //get tournament list from db
    Match.find({mOwner:req.session.displayName}, (err, matches) => {
        if(err){
            return res.send('-2') //server error
        }

        //create a color at random
        let colorObj={
            r : Math.floor(Math.random()*255),
            g : Math.floor(Math.random()*255),
            b : Math.floor(Math.random()*255),
            a : 0.8
        }

        //get the first letter of the username
        let firstLetter = req.session.username!==undefined?req.session.username.substring(0,1):''

        console.log(matches)

        res.render('manage', {
            column:'manageTournament',
            matches: matches,
            color: colorObj,
            firstLetter:firstLetter,
            login: req.session.login,
            displayName: req.user ? req.user.displayName : ''
        })
    })
}

/**
 * select winner
 */
exports.doSelectWinner = (req,res) => {
    //query db based on _id
    Match.find({_id:req.body.mId}, (err, matches) => {
        if(err){
            return res.send('-2') //server error
        }

        //change winner
        matches[0].mWinner = req.body.mWinner
        matches[0].save().then(() =>{
            return res.send('1')
        })
    })
}
