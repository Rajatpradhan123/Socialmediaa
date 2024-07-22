var express = require('express');
var router = express.Router();
const Usermodel = require('../models/Userschema')
const sendmail = require('../utils/nodemailer')
const passport = require('passport')
const localstrategy = require('passport-local')
passport.use(new localstrategy(Usermodel.authenticate()))



router.post('/register', function (req, res, next) {

  const userdata = new Usermodel({
    name:req.body.name,
    username: req.body.username,
    email: req.body.email,
    

  })

  Usermodel.register(userdata, req.body.password)
    .then(function (registerUser) {
      passport.authenticate('local')(req, res, function () {
        sendmail(req,res)
        res.redirect('/login')

      })

    })

});



router.post('/login',passport.authenticate('local',{

 successRedirect:"/user/profile",
  failureRedirect:"/login"
}));


router.get('/profile',isLoggedIn,function (req, res, next) {
 
 res.render('profile', { title: 'profile | Socialmedia', user:req.user  })

});


function isLoggedIn(req, res, next) {

  if (req.isAuthenticated()) {
    return next()
  }
  else {

    res.redirect('/login')
  }

}



router.get('/logout', function (req, res, next) {
  req.logout(function (err) {

    if (err) {
      return next(err)
    }
    else {
      res.redirect('/login')

    }

  })


});













module.exports = router;
