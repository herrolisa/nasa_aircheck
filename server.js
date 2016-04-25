'use strict';
const express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      db          = require('./models'),
      apiRoute    = require('./routes/apiRoute.js'),
      searchRoute = require('./routes/searchRoute.js'),
      User        = db.User
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


app.get('/allUsers/:city', function(req,res){

  db.sequelize.query(`SELECT * FROM "Users" WHERE location='` + req.params.city + `'`)
  .then(function(users){

    var conditions = {
      coughing : 0,
      sneezing : 0,
      itchyeyesandnose : 0,
      sorethroat : 0,
      shortnessofbreath : 0,
      wateryeyes : 0,
      stuffynose : 0
    };

    users[0].forEach(function(element){
      for (var prop in element){
        if( conditions.hasOwnProperty(prop) ) {
          conditions[prop] += element[prop];
        }
      }
    });

    res.json(conditions);
  });
});

app.post('/newUser', function(req,res){
  // console.log(req.body);
  User.create({
    location : req.body.city,
    coughing : req.body.coughing,
    sneezing : req.body.sneezing,
    itchyeyesandnose : req.body.itchyeyesandnose,
    sorethroat : req.body.sorethroat,
    shortnessofbreath : req.body.shortnessofbreath,
    wateryeyes : req.body.wateryeyes,
    stuffynose : req.body.stuffynose,
    createdAt : new Date(),
    updatedAt : new Date()
  })
  .then(function(){
    res.redirect("/");
  });

});