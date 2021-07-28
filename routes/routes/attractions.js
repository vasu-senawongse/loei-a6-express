const AttractionController = require('../../controllers/AttractionController');
module.exports = (app) => {
  app.get('/attractions/get-attractions', AttractionController.getAttractions);
  app.get(
    '/attractions/get-attractions-by-filter',
    AttractionController.getAttractionsByFilter
  );
};
