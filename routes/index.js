var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/demo2', function(req, res, next) {
    res.render('demo2')
});
router.get('/demo3', function(req, res, next) {
  res.render('demo3')
});
router.get('/demo4', function(req, res, next) {
  res.render('demo4')
});
router.get('/demo5', function(req, res, next) {
  res.render('demo5')
});
router.get('/demo6', function(req, res, next) {
  res.render('demo6')
});
router.get('/demo7', function(req, res, next) {
  res.render('demo7')
});
router.get('/demo8', function(req, res, next) {
  res.render('demo8')
});

module.exports = router;
