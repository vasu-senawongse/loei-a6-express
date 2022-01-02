const UserController = require('../../controllers/UserController');
module.exports = (app) => {
  app.get('/users/get-users', UserController.getUsers);
  app.get('/users/get-user-by-id', UserController.getUserById);
  app.post('/users/update-user-by-id', UserController.updateUserById);
  app.delete('/users/delete-user', UserController.deleteUser);
};
