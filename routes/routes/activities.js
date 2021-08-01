const ActivityController = require('../../controllers/ActivityController');
module.exports = (app) => {
  app.get('/activities/get-activities', ActivityController.getActivities);
  app.get(
    '/activities/get-activity-by-id/:id',
    ActivityController.getActivityById
  );
  app.post(
    '/activities/create-activity',
    ActivityController.createActivity
  );
  app.post(
    '/activities/update-activity-by-id',
    ActivityController.updateActivityById
  );

};
