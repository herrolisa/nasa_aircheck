'use strict';

const express = require('express'),
    router    = express.Router(),
    request   = require('request'),
    APIs      = require('../APIs/apis.js')
    ;

router.route('/airnow/:lon/:lat')
  .get(function(req,res){
    request.get("https://www.airnowapi.org/aq/forecast/latLong/?format=application/json&latitude=" + req.params.lat + "&longitude=" + req.params.lon + "&date=2016-04-23&distance=25&API_KEY=" + APIs.airnow, function(error, response){
    res.send(response.body);
    });
  });

router.route('/openweather/:city')
  .get(function(req,res){
    request.get("http://api.openweathermap.org/data/2.5/forecast?q=" + req.params.city + "&mode=JSON&appid=" + APIs.openweather, function(error, response){
      res.send(response.body);
    });
  });


module.exports = router;