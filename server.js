var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
sql = require('./config/connection');
require('dotenv').config();
var app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.text({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));

app.use(express.static(__dirname + '/public'));
require('./routes/routes')(app);
app.get('/', (req, res) => res.send('Hello Expressjs!'));
app.listen(5000, () => console.log('server run listening on port 5000'));
module.exports = app;
