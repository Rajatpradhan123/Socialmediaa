var express = require('express');
var router = express.Router();
const { isLoggedIn } = require('../middlewares/middleware')
const Usermodel = require('../models/Userschema')
const postmodel = require('../models/postschema')
const sendmail = require('../utils/nodemailer')
const passport = require('passport')
const localstrategy = require('passport-local')

passport.use(new localstrategy(Usermodel.authenticate()))


const upload = require('../utils/multer').single('photo')



router.post('/register', function (req, res, next) {

  const userdata = new Usermodel({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
  })

  Usermodel
    .register(userdata, req.body.password)
    .then(function (registerUser) {
      passport.authenticate('local')(req, res, function () {
        sendmail(req, res)
        res.redirect('/login')
      })
    })
});

router.post('/createpost', upload, isLoggedIn, async function (req, res, next) {

  const newpost = await postmodel.create({
    title: req.body.title,
    description: req.body.description,


  })

  const currentLoggedInuser = req.user
  newpost.user = currentLoggedInuser._id
  currentLoggedInuser.post.push(newpost._id)
  await newpost.save()
  await currentLoggedInuser.save()
  res.redirect('/user/profile')

});





router.post('/login', passport.authenticate('local', {
  successRedirect: "/user/profile",
  failureRedirect: "/login"
}));


router.get('/profile', isLoggedIn, async function (req, res, next) {
  const posts = await req.user.populate('post')
  const allpost = posts.post
  res.render('profile', { title: 'profile | Socialmedia', user: req.user, allpost: allpost })
});


router.get('/timeline', isLoggedIn, async function (req, res, next) {
 
  const allpost = await postmodel.find()
  res.render('timeline', { title: 'profile | Socialmedia', user: req.user, allpost: allpost })
});




router.get('/Delete/:id', isLoggedIn, async function (req, res, next) {
  const Data = await postmodel.findByIdAndDelete(req.params.id)
  res.redirect('/user/profile')
});



router.get('/Update/:id', isLoggedIn, async function (req, res, next) {
  const Update = await postmodel.findById(req.params.id)
  res.render('Update', { Update: Update, user: req.user });
});

router.post('/Update/:id', isLoggedIn, async function (req, res, next) {
  const Updatedata = await postmodel.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,

  })

  res.redirect('/user/profile')
});



router.get('/logout', isLoggedIn, function (req, res, next) {
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