'use strict';

var get_data = document.getElementById('get_data');
var display = document.getElementById('display');
var globalMap;

window.onload = function(){
  var request = new XMLHttpRequest();
  request.addEventListener('load', function(data){
    var city = data.currentTarget.responseText;

    globalMap = L.map('mapid');

      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'ypyang237.ponmj9ac',
        accessToken: 'pk.eyJ1IjoieXB5YW5nMjM3IiwiYSI6ImNpbmR3MXJxeDB4NmF2ZmtxYXgzMWFseGgifQ.N2EZUCHiW2pvHq9LHQZnXw'
      }).addTo(globalMap);

    var cityCapitalized = city.split("");
    cityCapitalized[0] = cityCapitalized[0].toUpperCase();
    cityCapitalized = cityCapitalized.join("");
    getUserData(cityCapitalized);


  getWeatherData(city, function(coords){
    getAirNowData(coords, function(condition){
        generateMap(coords, globalMap, condition);
      });
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

  var cityCapitalized = city.split("");
  cityCapitalized[0] = cityCapitalized[0].toUpperCase();
  cityCapitalized = cityCapitalized.join("");
  getUserData(cityCapitalized);

  getWeatherData(city, function(coords){
    getAirNowData(coords, function(condition){
      generateMap(coords, globalMap, condition);
    });
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

function getAirNowData(coords, callback){
  var request = new XMLHttpRequest();
  request.addEventListener('load', function(data){

    var airData = JSON.parse(data.currentTarget.responseText);

    updateDisplay({
      "AirNow Category" : airData[0].Category.Name,
      "AirNow Condition" : airData[0].Category.Number,
      "Discussion" : airData[0].Discussion || "N/A"
    });

    callback(airData[0].Category.Name);

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


/// d3 Visualization

function visualize(object) {
  var ANIM_DELAY, ANIM_DURATION, BAR_HEIGHT, COLORS, COLORS_G, DATA, H, INITIAL_WIDTH, M, MAX_VALUE, NAME, TOTAL_VALUE, W, container, g, highlight, highlightClear, host, oH, oW, percentScale, randomize, resize, svg, update, xScale, yScale;
  NAME = 'horizontal-bar';
  M = 0;
  COLORS = ['#eaa54b', '#66a1e2', '#8065e4', '#48cb80'];
  COLORS_G = ['#b5b5b5', '#8c8c8c', '#6b6b6b', '#565656'];
  DATA = [
    {
      value: object.coughing,
      desc: 'Coughing'
    }, {
      value: object.sneezing,
      desc: 'Sneezing'
    },

    {
      value: object.itchyeyesandnose,
      desc: 'Itchy Eyes and Nose'
    }, {
      value: object.sorethroat,
      desc: 'Sore Throat'
    },

    {
      value: object.shortnessofbreath,
      desc: 'Shortness of Breath'
    }, {
      value: object.wateryeyes,
      desc: 'Watery Eyes'
    },

     {
      value: object.stuffynose,
      desc: 'Stuffy Nose'
    }
  ];
  randomize = function(min, max) {
    return DATA.map(function(d) {
      d.value = Math.floor(Math.random() * (max - min) + min);
      return d;
    });
  };
  highlight = function(seldata, seli) {
    d3.event.stopPropagation();
    svg.selectAll('.bar').attr('fill', function(d, i) {
      if (i === seli) {
        return COLORS[i];
      } else {
        return COLORS_G[i];
      }
    });
    return d3.select(this).attr('x', 15).attr('y', function() {
      return +this.getAttribute('y') + 15;
    }).attr('width', function(d) {
      return xScale(d.value) - 30;
    }).attr('height', BAR_HEIGHT - 30).transition().duration(500).ease('elastic').attr('x', 0).attr('y', function() {
      return +this.getAttribute('y') - 15;
    }).attr('height', BAR_HEIGHT).attr('width', function(d) {
      return xScale(d.value);
    });
  };
  highlightClear = function(seldata, seli) {
    d3.event.stopPropagation();
    return svg.selectAll('.bar').attr('fill', function(d, i) {
      return COLORS[i];
    });
  };
  MAX_VALUE = d3.max(DATA, function(d) {
    return d.value;
  });
  TOTAL_VALUE = DATA.reduce(function(p, c) {
    if (typeof p === 'object') {
      return p.value + c.value;
    } else {
      return p + c.value;
    }
  });
  ANIM_DURATION = 750;
  ANIM_DELAY = 300;
  oW = window.innerWidth;
  oH = window.innerHeight;
  W = oW - M - M;
  H = oH - M - M;
  BAR_HEIGHT = H / DATA.length;
  INITIAL_WIDTH = 15;
  svg = d3.select('#chart').append('svg').on('click', highlightClear).attr('class', NAME).attr('width', oW).attr('height', oH);
  xScale = d3.scale.linear().domain([0, MAX_VALUE * 1.5]).range([INITIAL_WIDTH, oW]);
  percentScale = d3.scale.linear().domain([0, TOTAL_VALUE]).range([0, 100]);
  yScale = d3.scale.linear().domain([0, DATA.length]).range([0, oH]);
  g = svg.selectAll('g').data(DATA);
  container = g.enter().append('g');
  container.append('rect').attr('class', 'bar').attr('x', 0).attr('y', function(d, i) {
    return i * BAR_HEIGHT;
  }).attr('width', INITIAL_WIDTH).attr('height', BAR_HEIGHT).attr('fill', function(d, i) {
    return COLORS[i % DATA.length];
  }).on('click', highlight).transition().duration(ANIM_DURATION).delay(function(d, i) {
    return i * 100;
  }).attr('width', function(d) {
    return xScale(d.value);
  });
  container.append('line').style('stroke', '#767676').style('fill', 'none').style('stroke-width', '1px').attr('x1', 0).attr('y1', function(d, i) {
    return yScale(i);
  }).attr('x2', oW).attr('y2', function(d, i) {
    return yScale(i);
  });
  container.append('text').attr('pointer-events', 'none').attr('class', 'portion').attr('x', function(d, i) {
    return BAR_HEIGHT * 0.8;
  }).attr('y', function(d, i) {
    return yScale(i) + BAR_HEIGHT / 2;
  }).attr('dy', ".35em").attr('font-size', (BAR_HEIGHT / 2.5) + "px").attr('text-anchor', 'end').attr('fill', '#fff').text("0").transition().duration(ANIM_DURATION).tween('text', function(d) {
    var i;
    i = d3.interpolate(this.textContent, percentScale(d.value));
    return function(t) {
      return this.textContent = i(t).toFixed(0);
    };
  });
  container.append('text').attr('pointer-events', 'none').attr('class', 'portion_sign').attr('x', function(d, i) {
    return BAR_HEIGHT * 0.8 + 5;
  }).attr('y', function(d, i) {
    return yScale(i) + BAR_HEIGHT / 2;
  }).attr('dy', ".7em").attr('font-size', (BAR_HEIGHT / 5) + "px").attr('text-anchor', 'start').attr('fill', '#fff').text("%");
  container.append('text').attr('pointer-events', 'none').attr('class', 'desc').attr('x', function(d, i) {
    return BAR_HEIGHT * 1.3;
  }).attr('y', function(d, i) {
    return yScale(i) + BAR_HEIGHT / 2;
  }).attr('dy', "-.35em").attr('font-size', (BAR_HEIGHT / 4.7) + "px").attr('fill', '#fff').text(function(d) {
    return d.desc;
  });
  container.append('text').attr('pointer-events', 'none').attr('class', 'item_count').attr('x', function(d, i) {
    return BAR_HEIGHT * 1.3;
  }).attr('y', function(d, i) {
    return yScale(i) + BAR_HEIGHT / 2;
  }).attr('dy', "1.4em").attr('font-size', (BAR_HEIGHT / 7.1) + "px").attr('fill', '#fff').style('opacity', .7).text(function(d) {
    return d.value + " items";
  });
  container.append('path').attr('class', 'arrow').attr('d', 'M15 9l-2.12 2.12L19.76 18l-6.88 6.88L15 27l9-9z').attr('viewBox', '0 0 36 36').attr('transform', function(d, i) {
    return "translate(" + (oW - 60) + ", " + (yScale(i) + BAR_HEIGHT / 2 - 18) + ")";
  }).style('fill', '#fff');
  g.exit().remove();
  resize = function() {
    oW = window.innerWidth;
    oH = window.innerHeight;
    W = oW - M - M;
    H = oH - M - M;
    BAR_HEIGHT = H / DATA.length;
    svg.attr('width', oW).attr('height', oH);
    xScale.range([INITIAL_WIDTH, oW]);
    yScale.range([0, oH]);
    g = svg.selectAll('g');
    g.select('.bar').attr('y', function(d, i) {
      return i * BAR_HEIGHT;
    }).attr('height', BAR_HEIGHT).transition().duration(ANIM_DURATION).delay(function(d, i) {
      return i * 100;
    }).attr('width', function(d) {
      return xScale(d.value);
    });
    g.select('line').attr('y1', function(d, i) {
      return yScale(i);
    }).attr('x2', oW).attr('y2', function(d, i) {
      return yScale(i);
    });
    g.select('.portion').attr('x', function(d, i) {
      return BAR_HEIGHT * 0.8;
    }).attr('y', function(d, i) {
      return yScale(i) + BAR_HEIGHT / 2;
    }).attr('pointer-events', 'none').attr('font-size', (BAR_HEIGHT / 2.5) + "px");
    g.select('.portion_sign').attr('x', function(d, i) {
      return BAR_HEIGHT * 0.8 + 5;
    }).attr('y', function(d, i) {
      return yScale(i) + BAR_HEIGHT / 2;
    }).attr('pointer-events', 'none').attr('font-size', (BAR_HEIGHT / 5) + "px");
    g.select('.desc').attr('x', function(d, i) {
      return BAR_HEIGHT * 1.3;
    }).attr('y', function(d, i) {
      return yScale(i) + BAR_HEIGHT / 2;
    }).attr('pointer-events', 'none').attr('font-size', (BAR_HEIGHT / 4.7) + "px");
    g.select('.item_count').attr('x', function(d, i) {
      return BAR_HEIGHT * 1.3;
    }).attr('y', function(d, i) {
      return yScale(i) + BAR_HEIGHT / 2;
    }).attr('pointer-events', 'none').attr('font-size', (BAR_HEIGHT / 7.1) + "px");
    return g.select('.arrow').attr('pointer-events', 'none').attr('transform', function(d, i) {
      return "translate(" + (oW - 60) + ", " + (yScale(i) + BAR_HEIGHT / 2 - 18) + ")";
    });
  };
  update = function(data) {
    MAX_VALUE = d3.max(DATA, function(d) {
      return d.value;
    });
    TOTAL_VALUE = DATA.reduce(function(p, c) {
      if (typeof p === 'object') {
        return p.value + c.value;
      } else {
        return p + c.value;
      }
    });
    BAR_HEIGHT = H / DATA.length;
    xScale.domain([0, MAX_VALUE * 1.5]);
    yScale.domain([0, DATA.length]);
    percentScale.domain([0, TOTAL_VALUE]);
    g = svg.selectAll('g').data(data);
    g.select('.bar').transition().duration(ANIM_DURATION).delay(function(d, i) {
      return i * 100;
    }).attr('width', function(d) {
      return xScale(d.value);
    }).attr('fill', function(d, i) {
      return COLORS[i];
    });
    g.select('.portion').transition().duration(ANIM_DURATION).tween('text', function(d) {
      var i;
      i = d3.interpolate(this.textContent, percentScale(d.value));
      return function(t) {
        return this.textContent = i(t).toFixed(0);
      };
    });
    return g.select('.item_count').text(function(d) {
      return d.value + " items";
    });
  };
  d3.select(window).on('resize', resize);
  host = window.location.hostname;
  if (host === 's.codepen.io' || host === 'localhost') {
    return setInterval((function() {
      return update(randomize(0, 20));
    }), 6000);
  }
};

