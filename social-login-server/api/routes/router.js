var user = require('../controllers/userController');
var file = require('../controllers/fileController');

module.exports = function(app) {

  app.route('/user/register')
		.post(user.register);

  app.route('/user/login')
	  .post(user.login);

  app.route('/verify/:email/:hash')
    .get(user.verify);

  app.route('/user/fetch/:id')
    .get(user.fetch);

  app.route('/user/update')
    .post(user.update);

  app.route('/file/upload')
    .post(file.upload);

  app.route('/file/get_image/:name')
    .get(file.get_image);


	app.route('/health-check').get(function(req, res) {
    res.status(200);
    res.send('Hello World');
  });
}
