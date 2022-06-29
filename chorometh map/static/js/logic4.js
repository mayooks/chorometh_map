// Creating the map object
var myMap = L.map("map", {
  center: [35.1264,33.4299],
  zoom:2.1
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get the GeoJSON data.
var link = "https://datahub.io/core/geo-countries/r/countries.geojson";

// The function that will determine the color of a neighborhood based on the borough that it belongs to
function chooseColor(borough) {
  if (borough == "Brooklyn") return "yellow";
  else if (borough == "Bronx") return "red";
  else if (borough == "Manhattan") return "orange";
  else if (borough == "Queens") return "green";
  else if (borough == "Staten Island") return "purple";
  else return "black";
}




d3.csv("https://github.com/khadra1/Project-3-Connectivity/blob/main/Resources/data-clean/countries_data.csv", function(data){
    console.log(data[20]);

});


// Getting our GeoJSON data
d3.json(link, function(data){
  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data, {
    // Styling each feature (in this case, a neighborhood)
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor() function to decide which color to color our neighborhood. (The color is based on the borough.)
        fillColor: chooseColor(feature.properties.borough),
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // This is called on each feature.
    onEachFeature: function(feature, layer) {
      // Set the mouse events to change the map styling.
      layer.on({
        // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a popup with information that's relevant to it
      layer.bindPopup("<h1>" + feature.properties.ADMIN + "</h1> <hr> <h2>" + feature.properties.ADMIN + "</h2>");

    }
  }).addTo(myMap);
});
