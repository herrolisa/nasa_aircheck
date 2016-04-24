'use strict';

var get_data = document.getElementById('get_data');
var display = document.getElementById('display');

window.onload = function(){
  var request = new XMLHttpRequest();
  request.addEventListener('load', function(data){
    var city = data.currentTarget.responseText;

    var cityCapitalized = city.split("");
    cityCapitalized[0] = cityCapitalized[0].toUpperCase();
    cityCapitalized = cityCapitalized.join("");
    getUserData(cityCapitalized);

    getWeatherData(city, function(coords){
      getAirNowData(coords);
      generateMap(coords);
    });
  });

  request.open('GET', "/search/currentCity");
  request.send();
};

function updateDisplay(object){
  for (var prop in object){
    if(object.hasOwnProperty(prop)){
      var p = document.createElement('p');
      p.innerHTML = prop + ": " + object[prop];
      display.appendChild(p);
    }
  }
}

get_data.addEventListener("click", function(){
  display.innerHTML = "";
  var city = document.getElementById('city').value;
  getWeatherData(city, function(coords){
    getAirNowData(coords);
    generateMap(coords);
  });
});

function getWeatherData(city, callback){
  var request = new XMLHttpRequest();
  request.addEventListener('load', function(data){
    var weatherData = JSON.parse(data.target.responseText).list[0];

    updateDisplay( {
      humidity : weatherData.main.humidity + "%",
      tempC : Math.round((weatherData.main.temp - 273) * 10)/10 + " C",
      description : weatherData.weather[0].description,
      windSpeed : weatherData.wind.speed + " m/s",
      windDeg : Math.round(weatherData.wind.deg) + " degrees"
    });

    callback({
      lat : JSON.parse(data.target.responseText).city.coord.lat,
      lon : JSON.parse(data.target.responseText).city.coord.lon
    });

  });
  request.open('GET', "/api/openweather/" + city);
  request.send();
}

function getAirNowData(coords){
  var request = new XMLHttpRequest();
  request.addEventListener('load', function(data){
    var airData = JSON.parse(data.currentTarget.responseText);

    console.log('airData', airData);

    updateDisplay({
      "AirNow Category" : airData[0].Category.Name,
      "AirNow Condition" : airData[0].Category.Number,
      "Discussion" : airData[0].Discussion || "N/A"
    });

  });
  request.open('GET', "/api/airnow/" + coords.lon + "/" + coords.lat);
  request.send();
}

function getUserData(city){
  var request = new XMLHttpRequest();
  request.addEventListener('load', function(data){
    var airData = JSON.parse(data.currentTarget.responseText);
    updateDisplay(airData);
  });
  request.open('GET', "/allUsers/" + city);
  request.send();
}

