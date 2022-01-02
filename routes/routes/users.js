const BaseController = require('../../controllers/BaseController');
module.exports = (app) => {
  app.get('/users/get-users', BaseController.getUsers);
};
