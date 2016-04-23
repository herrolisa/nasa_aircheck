'use strict';
const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      db = require('./models')
      ;

app
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json())
  .use(express.static('public'))
  ;

app.listen(3000, function() {
  db.sequelize.sync();
  console.log('server started at 3000!');
});