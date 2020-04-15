const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')

app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:3000'}));
routes(app);

mongoose.connect('mongodb://localhost/appData',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.connection
.once('open', () => { console.log('Connected to MongoDB'); })
.on('error', (error) => {
  console.warn('Warning', error);
});

module.exports = app;
