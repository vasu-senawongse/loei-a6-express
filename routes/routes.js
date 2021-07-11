const BaseController = require('./../controllers/BaseController');
const District = require('./routes/districts');
const Attraction = require('./routes/attractions');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
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
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });
  app.get('/', BaseController.index);
  app.post('/upload', upload.single('file'), (req, res) => {
    try {
      res.send(req.file);
    } catch (err) {
      res.send(400);
    }
  });

  District(app);
  Attraction(app);
};
