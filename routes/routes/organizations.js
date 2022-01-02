const BaseController = require('../../controllers/BaseController');
module.exports = (app) => {
  app.get("/organizations/get-organizations", BaseController.getOrganizations);
  app.delete("/organizations/delete-organization", BaseController.deleteOrganization);
  app.post("/organizations/create-organization", BaseController.createOrganization);
};
