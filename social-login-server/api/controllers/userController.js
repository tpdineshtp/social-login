var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    SocialLoginHistory = mongoose.model('SocialLoginHistory');
var crypto = require('crypto');
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('fD-HfoAUJEab-XxZb12Q6A');


// end point to register to user
exports.register = function(req, res) {
  var newuser = new User();
  newuser.userName = req.body.name;
  newuser.password = req.body.password;
  newuser.email = req.body.email;
  newuser.isActive = false;
  newuser.profilePic = false;
  var current_date = (new Date()).valueOf().toString();
  var random = Math.random().toString();
  var hash_val = crypto.createHash('sha1').update(current_date + random).digest('hex');
  newuser.validationHash = hash_val;

  send_email(req.body.email, hash_val);

  newuser.save(function(err, doc) {
    if (err)
      return res.status(400).send(err);

    return res.status(200).send({});
  });
};

// end point to login
exports.login = function(req, res) {
  User.find({email : req.body.username, password: req.body.password}, function(err, user) {
    if (err)
      return res.status(400).send(err);

    if(user.length>0){
      if(user[0].isActive)
        return res.status(200).send(user);
      else {
        return res.status(220).send(JSON.stringify({message: 'Please verify your mail' }));
      }
    }

    else {
      return res.status(401).send(user);
    }
  });
};

// end point to verify email
exports.verify = function(req, res) {
  User.findOneAndUpdate({email: req.params.email, validationHash: req.params.hash}, {$set:{isActive:true}}, {new: true}, function(err, doc){
      if(err){
          console.log("Something wrong when updating data!");
          return res.status(401).send(user);
      }
      if(doc)
        return res.status(200).send("Successfully Verified");
      else {
        return res.status(400).send("Invalid URL");
      }
  });
};


//end point to fetch details of social login
exports.fetch = function(req, res) {

  SocialLoginHistory.findOne({id: req.params.id}, {}, { sort: { 'Created_date' : -1 } }, function(err, user) {
    if (err)
      return res.status(400).send(err);

      return res.status(200).send(user);
  });

};

//end point to update user details
exports.update = function(req, res) {
  var current_date = (new Date()).valueOf().toString();
  var random = Math.random().toString();
  var hash_val = crypto.createHash('sha1').update(current_date + random).digest('hex');
  User.findOneAndUpdate({_id: req.body.id}, {$set:{email:req.body.email, isActive: false, password: req.body.password, validationHash: hash_val}}, {new: true}, function(err, doc){
      if(err){
          return res.status(500).send(err);
      }
      console.log(req.body.email)
      send_email(req.body.email, hash_val);
      return res.status(200).send(doc);
  });
};


//to send mail to user's email address to verify them
function send_email(email, hash){

    var message = {
      "html": "<p>Please click the following link to verify your email </p> http://127.0.0.1:3000/verify/"+email+"/"+hash,
      "text": "Example text content",
      "subject": "Please verify your mail",
      "from_email": "connections@hyphenmail.com",
      "from_name": "Verification Mail",
      "to": [{
              "email": email,
              "name": "Mail Verification",
              "type": "to"
          }],
      "headers": {
          "Reply-To": "message.reply@example.com"
      },
      "important": false,
      "track_opens": null
  };
  var async = false;
  var ip_pool = "Main Pool";
  var send_at = "12-07-2018";
  mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at}, function(result) {
      console.log(result);
  }, function(e) {
      console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
  });
}
