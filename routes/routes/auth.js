const AuthController = require('../../controllers/AuthController');
module.exports = (app) => {
  app.post('/auth/signup', AuthController.signup);
  app.post('/auth/signin', AuthController.signin);
};
