function generateMap(coords){

var mymap = L.map('mapid').setView([coords.lat, coords.lon], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'ypyang237.ponmj9ac',
    accessToken: 'pk.eyJ1IjoieXB5YW5nMjM3IiwiYSI6ImNpbmR3MXJxeDB4NmF2ZmtxYXgzMWFseGgifQ.N2EZUCHiW2pvHq9LHQZnXw'
}).addTo(mymap);

var marker = L.marker([coords.lat, coords.lon]).addTo(mymap);

var circle = L.circle([coords.lat, coords.lon], 500, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).addTo(mymap);

// var polygon = L.polygon([
//     [21.30694, -157.858337],
//     [21.305, -157.8582],
//     [21.304, -157.857]
// ]).addTo(mymap);


marker.bindPopup("<b>Honolulu!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
// polygon.bindPopup("I am a polygon.");


var popup = L.popup();

var popup = L.popup()
    .setLatLng([coords.lat, coords.lon])
    .setContent("I am a standalone popup.")
    .openOn(mymap);

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);


// function onMouseOver(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(mymap);
// }


var canvasTiles = L.tileLayer.canvas();

canvasTiles.drawTile = function(canvas, tilePoint, zoom) {
    var ctx = canvas.getContext('2d');
    // draw something on the tile canvas
}

mymap.on('click', onMapClick);

}