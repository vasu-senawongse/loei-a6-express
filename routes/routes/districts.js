const DistrictController = require('../../controllers/DistrictController');
module.exports = (app) => {
  app.get('/districts/get-districts', DistrictController.getDistricts);
  app.post('/districts/create-district', DistrictController.createDistrict);
};
