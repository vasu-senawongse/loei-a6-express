const RestaurantController = require('../../controllers/RestaurantController');
module.exports = (app) => {
  app.get('/restaurants/get-restaurants', RestaurantController.getRestaurants);
  app.get(
    '/restaurants/get-restaurant-by-id/:id',
    RestaurantController.getRestaurantById
  );

  app.get(
    '/restaurants/get-restaurants-by-filter',
    RestaurantController.getRestaurantsByFilter
  );


  app.post(
    '/restaurants/create-restaurant',
    RestaurantController.createRestaurant
  );
  app.post(
    '/restaurants/update-restaurant-by-id',
    RestaurantController.updateRestaurantById
  );

};
