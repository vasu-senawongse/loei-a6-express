const AmenityController = require('../../controllers/AmenityController');
module.exports = (app) => {
  app.get('/amenities/get-amenities', AmenityController.getAmenities);
  app.get(
    '/amenities/get-amenity-by-id/:id',
    AmenityController.getAmenityById
  );
  app.post(
    '/amenities/create-amenity',
    AmenityController.createAmenity
  );
  app.post(
    '/amenities/update-amenity-by-id',
    AmenityController.updateAmenityById
  );

};
