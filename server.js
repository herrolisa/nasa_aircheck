'use strict';
const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      db = require('./models'),
      request = require('request'),
      APIs = require('./APIs/apis.js')
      ;

var currentCity = 'honolulu, us';

app
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json())
  .use(express.static('public'))
  ;

app.get('/api/airnow/:lon/:lat', function(req,res){
  request.get("https://www.airnowapi.org/aq/forecast/latLong/?format=application/json&latitude=" + req.params.lat + "&longitude=" + req.params.lon + "&date=2016-04-23&distance=25&API_KEY=" + APIs.airnow, function(error, response){
    res.send(response.body);
  });
});

app.get('/api/openweather/:city', function(req,res){
  request.get("http://api.openweathermap.org/data/2.5/forecast?q=" + req.params.city + "&mode=JSON&appid=" + APIs.openweather, function(error, response){
    res.send(response.body);
  });
});

app.post('/search', function(req,res){
  currentCity = (req.body.city);
  res.redirect('/data.html');
});

app.get('/currentCity', function(req,res){
  res.send(currentCity);
});

app.listen(3000, function() {
  db.sequelize.sync();
  console.log('server started at 3000!');
});