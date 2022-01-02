const BaseController = require("./../controllers/BaseController");
const Attraction = require("./routes/attractions");
const Amenity = require("./routes/amenities");
const Activity = require("./routes/activities");
const Hotel = require("./routes/hotels");
const Restaurant = require("./routes/restaurants");
const Contract = require("./routes/contacts");
const Auth = require("./routes/auth");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(req.body.path, { recursive: true });
    cb(null, req.body.path);
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage });
module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/", BaseController.index);
  app.get("/get-system-overview", BaseController.getSystemOverview);
  app.get("/get-top-attraction", BaseController.getTopAttraction);
  app.get("/get-top-search", BaseController.getTopSearch);
  app.get("/get-top-search-date", BaseController.getTopSearchDate);
  app.get("/organizations/get-organizations", BaseController.getOrganizations);
  app.get("/organizations/delete-organization", BaseController.deleteOrganization);
  app.post("/upload", upload.array("file"), (req, res) => {
    try {
      res.send(req.file);
    } catch (err) {
      res.send(400);
    }
  });
  Auth(app);
  Attraction(app);
  Amenity(app);
  Activity(app);
  Hotel(app);
  Restaurant(app);
  Contract(app);
};
