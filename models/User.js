'use strict';

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    location: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    coughing: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    sneezing: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    itchyeyesandnose: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    sorethroat: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    shortnessofbreath: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    wateryeyes: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    stuffynose: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};

// module.exports = function(sequelize, DataTypes){
//   var User = sequelize.define("User", {
//     username: DataTypes.STRING
//   },{
//     classMethods: {
//       associate: function(models){
//         //defining one to many relationship between User and Tasks
//         User.hasMany(models.Task);
//       }
//     }
//   });

//   return User;
// };