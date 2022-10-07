# leaflet-challenge
Module 15 Challenge

# Description
Honestly without one, Dora the Explorer would forever be walking aimlessly around in the Lost City of Gold. But so long and farewell to that large map or printing out directions from MapQuest and a very warm welcome to mapping visualizations! Mapping visualization is a timeless tool that allows for geographically representation and analysis to visually see the distribution of data in a region. Taking advantage of Javascript and its libraries, this challenge is an exercise in creating an interactive map of earthquake data gathered from [United States Geological Survey (USGS)](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) (USGS).

The d3 library is used to call and fetch the (USGS) website, which is subsequently passed through Leaflet's geoJson function. Leaflet is an open source JS library used to build interactive map applications. The geoJson function requires a particular type of json referred to as a geojson file, which often contains geometric coordinates to accurately map markers or boundaries. In this challenge, the script draws markers on a world map indicating an earthquake. The marker size and color depend on the earthquake's magnitude and depth, respectively. After the markers are created, the script makes a second call to a [Tectonic Plates geojson file](https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json) to draw the plates on the map as well.

In this repository, there are two folders corresponding to the two parts of the challenge as well as an HTML file. Folders Leaflet_Part_1 and Leaflet_Part_2 only really differ in that part 2 includes the tectonic plates. Within each Leaflet folder, there is static folder with CSS style and the logic.js. There is also an index.html in each Leaflet folder that can be ignored. The index.html in the main directory of the repository points to the logic part of the challenge.

# Visuals

Part 1 Markers

![image](https://user-images.githubusercontent.com/107419765/194456590-6d4948ea-9f1a-4b92-b787-d49c466ebde3.png)

Part 2 Tectonic Plates

![image](https://user-images.githubusercontent.com/107419765/194456639-0999566e-a901-4685-9352-d3452c5b6e13.png)


