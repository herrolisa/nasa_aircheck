'use strict';

const express = require('express'),
      router  = express.Router()
      ;

var currentCity = 'Honolulu';

router.route('/')
  .post(function(req,res){
    currentCity = req.body.city;
    res.redirect('/data.html');
  });

router.route('/currentCity')
  .get(function(req,res){
    res.send(currentCity);
  });

module.exports = router;