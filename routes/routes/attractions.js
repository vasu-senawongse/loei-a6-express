const AttractionController = require("../../controllers/AttractionController");
module.exports = (app) => {
  app.get("/attractions/get-attractions", AttractionController.getAttractions);
  app.get(
    "/attractions/get-attraction-types",
    AttractionController.getAttractionTypes
  );
  app.get(
    "/attractions/get-attractions-by-filter",
    AttractionController.getAttractionsByFilter
  );

  app.get(
    "/attractions/get-attraction-next-id",
    AttractionController.getAttractionNextId
  );
  app.get(
    "/attractions/get-attraction-by-id/:id",
    AttractionController.getAttractionById
  );

  app.get(
    "/attractions/get-attraction-by-name/:name",
    AttractionController.getAttractionByName
  );

  app.get(
    "/attractions/get-attraction-gallery-by-id/:id",
    AttractionController.getAttractionGalleryById
  );
  app.post(
    "/attractions/create-attraction",
    AttractionController.createAttraction
  );
  app.post(
    "/attractions/update-attraction-by-id",
    AttractionController.updateAttractionById
  );

  app.delete(
    "/attractions/delete-attraction-image",
    AttractionController.deleteAttractionImage
  );

  app.post(
    "/attractions/insert-attraction-image",
    AttractionController.insertAttractionImage
  );

  app.post("/attractions/add-options", AttractionController.addOptions);

  app.post(
    "/attractions/select-attraction-thumbnail",
    AttractionController.selectAttractionThumbnail
  );

  app.delete(
    "/attractions/delete-attraction",
    AttractionController.deleteAttraction
  );

  app.get("/attractions/export", AttractionController.export);
};
