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

  // db.sequelize.query(`
  //   INSERT INTO "Users"
  //   (
  //     location,
  //     coughing,
  //     sneezing,
  //     itchyeyesandnose,
  //     sorethroat,
  //     shortnessofbreath,
  //     wateryeyes,
  //     stuffynose
  //   )
  //   VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
  //   [
  //     req.body.city,
  //     req.body.coughing,
  //     req.body.sneezing,
  //     req.body.itchyeyesandnose,
  //     req.body.sorethroat,
  //     req.body.shortnessofbreath,
  //     req.body.wateryeyes,
  //     req.body.stuffynose,
  //     new Date(),
  //     new Date()
  //   ])
  //   .then(function(){
  //   });

    res.redirect("/");
});