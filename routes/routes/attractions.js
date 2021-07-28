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
  app.post(
    '/attractions/update-attraction-by-id',
    AttractionController.updateAttractionById
  );
};
