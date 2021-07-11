var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(
  `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?readPreference=primary&appname=MongoDB%20Compass&ssl=false`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
app.use(express.static(__dirname + '/public'));
require('./routes/routes')(app);
app.get('/', (req, res) => res.send('Hello Expressjs!'));
app.listen(5000, () => console.log('server run listening on port 5000'));
module.exports = app;
