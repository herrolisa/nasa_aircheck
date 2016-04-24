function generateMap(coords, mymap){


mymap.setView([coords.lat, coords.lon], 13);

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