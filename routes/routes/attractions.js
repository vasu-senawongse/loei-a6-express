const AttractionController = require('../../controllers/AttractionController');
module.exports = (app) => {
  app.get('/attractions/get-attractions', AttractionController.getAttractions);
  app.get(
    '/attractions/get-attractions-by-filter',
    AttractionController.getAttractionsByFilter
  );
  app.get(
    '/attractions/get-attraction-by-id/:id',
    AttractionController.getAttractionById
  );

  app.get(
    '/attractions/get-attraction-by-name/:name',
    AttractionController.getAttractionByName
  );

  
  app.get(
    '/attractions/get-attraction-gallery-by-id',
    AttractionController.getAttractionGalleryById
  );
  app.post(
    '/attractions/create-attraction',
    AttractionController.createAttraction
  );
  app.post(
    '/attractions/update-attraction-by-id',
    AttractionController.updateAttractionById
  );
};
