function generateMap(coords, mymap, condition){

  console.log('condition', condition);

  mymap.setView([coords.lat, coords.lon], 13);

  var marker;

  var medicalHelp = ['CVS ', 'LongsDrugs', 'Walgreens', 'Paper-Weight Clinic', 'Dr. Gomagames', 'PamPam Pharmacy', 'JoejoeBinx Hospital', 'Great-Success Hospital', 'Lisa-Pizza Urgent Care'];

  for (var i = 0; i < 6; i++) {
    marker = L.marker([coords.lat + Math.floor(Math.random()*5)/100, coords.lon + Math.floor(Math.random()*5)/100]).addTo(mymap);
    marker.bindPopup(medicalHelp[Math.floor(Math.random() * medicalHelp.length)]).openPopup();
  }

  // var circle = L.circle([coords.lat, coords.lon], 900, {
  //     color: 'red',
  //     fillColor: '#f03',
  //     fillOpacity: 0.5
  // }).addTo(mymap);

  // var polygon = L.polygon([
  //     [21.30694, -157.858337],
  //     [21.305, -157.8582],
  //     [21.304, -157.857]
  // ]).addTo(mymap);


  // circle.bindPopup("I am a circle.");
  // polygon.bindPopup("I am a polygon.");
  // var popup = L.popup();

  var popup = L.popup()
      .setLatLng([coords.lat + 0.0025, coords.lon + 0.001])
      .setContent("Air quality here is pretty " + condition)
      .openOn(mymap);

  function onMapClick(e) {
      popup
          .setLatLng(e.latlng)
          .setContent("Count of ppl suffering from " + 'allergies or respiratory symptoms')
          .openOn(mymap);
  }

  mymap.on('click', onMapClick);


}