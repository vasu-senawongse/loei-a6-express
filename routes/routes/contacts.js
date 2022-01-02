const ContactController = require("../../controllers/ContactController");
module.exports = (app) => {
  app.post("/contacts/create-contact", ContactController.createContact);
  app.get(
    "/contacts/get-pending-contacts",
    ContactController.getPendingContacts
  ); +
    app.post("/contacts/done-task", ContactController.doneTask);
};
