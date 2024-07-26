var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { user:req.user});
});

router.get('/Register', function(req, res, next) {
  res.render('Register', { user:req.user});
});

router.get('/About', function(req, res, next) {
  res.render('About', {  user:req.user});
});

router.get('/Contacts', function(req, res, next) {
  res.render('Contacts', { user:req.user });
});

router.get('/login', function(req, res, next) {
  res.render('login', { user:req.user});
});

router.get('/createpost', function(req, res, next) {
  res.render('createpost', { user:req.user});
});

module.exports = router;