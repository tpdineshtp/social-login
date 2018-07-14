var express = require('express');
var router = express.Router();
var passportFacebook = require('../auth/facebook');
var SocialLoginHistory = require('../models/socialLoginHistoryModel');

/* LOGIN ROUTER */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Please Sign In with:' });
});

/* LOGOUT ROUTER */
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

/* FACEBOOK ROUTER */
router.get('/facebook',
  passportFacebook.authenticate('facebook', { scope : ['email'] }));

router.get('/facebook/callback',
  passportFacebook.authenticate('facebook', { failureRedirect: 'http://localhost:8080/login' }),
  function(req, res) {
    SocialLoginHistory.findOne({}, {}, { sort: { 'Created_date' : -1 } }, function(err, post) {
      if(err) return res.status(404).send([]);
      //return res.status(200).send(post);
          res.redirect('http://localhost:8080/social-details?facebookId='+post.id)
    });


  });


module.exports = router;
