var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    SocialLoginHistory = mongoose.model('SocialLoginHistory'),
    multer = require('multer'),
    path = require('path');

const fileUpload = require('express-fileupload');


exports.upload = function(req, res, next) {
  console.log(req.files);
  let imageFile = req.files.file;

  imageFile.mv(`${__dirname}/images/${req.body.filename}.jpg`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    //res.json({file: `/api/controllers/images/${req.body.filename}.jpg`});

    User.findOneAndUpdate({email: req.body.filename}, {$set:{ profilePic: true}}, {new: true}, function(err, doc){
        if(err){
            return res.status(500).send(err);
        }
        console.log(req.body.email)
        return res.status(200).send(doc);
    });
  });
};

exports.get_image = function(req, res) {
  let imagename = req.params.name
  console.log(imagename);
  let imagepath = __dirname + "/images/" + imagename
  let image = fs.readFileSync(imagepath)
  let mime = fileType(image).mime

res.writeHead(200, {'Content-Type': mime })
res.end(image, 'binary')
}
