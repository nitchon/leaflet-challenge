let dataURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
let tectonicURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

let earthquakes = L.layerGroup();
let plates = L.layerGroup();

// Create the base layers.
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var sat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
// Create a baseMaps object.
var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo,
    "Satellite": sat
};

// Create an overlay object to hold our overlay.
var overlayMaps = {
    "Earthquakes": earthquakes,
    "TectonicPlates": plates
};

// Create our map, giving it the streetmap and earthquakes layers to display on load.
var myMap = L.map("map", {
    center: [
        37.09, -95.71
    ],
    zoom: 4,
    layers: [street, earthquakes]
});

// Create a layer control.
// Pass it our baseMaps and overlayMaps.
// Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);


d3.json(dataURL).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    function markerSize(magnitude) {
        return magnitude * 3;
    };
    function colorChange(depth) {
        switch (true) {
            case depth > 90:
                return 'red';
            case depth > 70:
                return 'orangered';
            case depth > 50:
                return 'orange';
            case depth > 30:
                return 'gold';
            case depth > 10:
                return 'yellow';
            case depth > -10:
                return 'lightgreen';
        }
    }

    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng,
                {
                    radius: markerSize(feature.properties.mag),
                    fillColor: colorChange(feature.geometry.coordinates[2]),
                    color: 'black',
                    fillOpacity: 0.5,
                    stroke: true,
                    weight: 0.5
                });
        },
        onEachFeature(feature, layer) {
            layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><h3>Date: ${new Date(feature.properties.time)}</h3>
            <hr><h3>Magnitude: ${feature.properties.mag}</h3>`);
        }
    }).addTo(earthquakes)
    earthquakes.addTo(myMap);
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [-10, 10, 30, 70, 90],
            labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colorChange(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };
    // Adding the legend to the map
    legend.addTo(myMap);
});

d3.json(tectonicURL).then(function (data) {
    L.geoJSON(data, {
        color: 'orange',
        weight: 1.5
    }).addTo(plates);
    plates.addTo(myMap);
})


