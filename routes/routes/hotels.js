const HotelController = require('../../controllers/HotelController');
module.exports = (app) => {
  app.get('/hotels/get-hotels', HotelController.getHotels);
  app.get(
    '/hotels/get-hotel-by-id/:id',
    HotelController.getHotelById
  );

  app.get(
    '/hotels/get-hotels-by-filter',
    HotelController.getHotelsByFilter
  );


  app.post(
    '/hotels/create-hotel',
    HotelController.createHotel
  );
  app.post(
    '/hotels/update-hotel-by-id',
    HotelController.updateHotelById
  );
  app.delete(
    '/hotels/delete-hotel',
    HotelController.deleteHotel
  );



  app.post(
    '/hotels/import-hotel',
    HotelController.importHotel
  );
};
