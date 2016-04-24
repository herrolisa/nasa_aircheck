'use strict';
const express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      db          = require('./models'),
      apiRoute    = require('./routes/apiRoute.js'),
      searchRoute = require('./routes/searchRoute.js')
      ;

app
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json())
  .use(express.static('public'))
  .use('/api', apiRoute)
  .use('/search', searchRoute)
  .listen(3000, function() {
    db.sequelize.sync();
    console.log('server started at 3000!');
  })
  ;


