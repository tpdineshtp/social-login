var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    SocialLoginHistory = mongoose.model('SocialLoginHistory'),
    multer = require('multer'),
    path = require('path');

const fileUpload = require('express-fileupload');

// gets profile picture from client and stores on server
exports.upload = function(req, res, next) {
  let imageFile = req.files.file;

  imageFile.mv(`${__dirname}/images/${req.body.filename}.jpg`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    User.findOneAndUpdate({email: req.body.filename}, {$set:{ profilePic: true}}, {new: true}, function(err, doc){
        if(err){
            return res.status(500).send(err);
        }
        return res.status(200).send(doc);
    });
  });
};
