let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//create the User Model instance
let userModel = require('../models/User');
let User = userModel.User; //alias

let Match = require('../models/Match')

exports.displayHomePage = (req,res) =>{
    if(!req.session.login){
        return res.redirect('/login')
    }
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
            login: req.session.login,
            firstLetter: firstLetter,
            displayName: req.user ? req.session.username : ''
        })
    })

}

module.exports.displayLoginPage = (req, res, next) => {
    if(req.session.login){
        return res.redirect('/')
    }

    // check if the user is already logged in
    if(!req.user)
    {
        res.render('auth/login', 
        {
           title: "Login",
           messages: req.flash('loginMessage'),
           displayName: req.user ? req.user.displayName : '' 
        })
    }
    else
    {
        return res.redirect('/matches');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        // server err?
        if(err)
        {
            return next(err);
        }
        // is there a user login error?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            // server error?
            if(err)
            {
                return next(err);
            }

            //store session data
            req.session.username = user.username
            req.session.displayName = user.displayName
            req.session.login=true

            return res.redirect('/matches');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/matches');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    // instantiate a user object
    let newUser = new User({
        displayName: req.body.displayName,
        username: req.body.username,
        email: req.body.email,
        //password: req.body.password
        
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log(err);
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!')
            }
            return res.render('auth/register',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {
            //go to login page
            return res.redirect('/login')
        }
    });
}

/*Logout*/
module.exports.performLogout = (req, res, next) => {
    if(!req.session.login){
        return res.redirect('/login')
    }
    req.session.destroy(function(err) {
        res.redirect('/login');

    })
}