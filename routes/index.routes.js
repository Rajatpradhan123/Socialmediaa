var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/Register', function(req, res, next) {
  res.render('Register', { title: 'Express' });
});

router.get('/About', function(req, res, next) {
  res.render('About', { title: 'Express' });
});

router.get('/Contacts', function(req, res, next) {
  res.render('Contacts', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

module.exports = router;
