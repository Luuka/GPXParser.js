# gpx-parser

*gpx-parser* is a lightweight JS library wich parse .gpx file and calculate some datas like 
- gpx metadatas
- total et cumulate distances
- min, max, average, positive and negative height différence

#gpx ? What is this ?

Wikipedia say :
> GPX, or GPS Exchange Format, is an XML schema designed as a common GPS data format for software applications.

gpx files are based on xml with specific tags and attributes

#How to do

### Load JavaScript file
```html
<script src="./js/gpx-parser.min.js"></script>
```

### Create and parse file
```js
var gpx = new gpxParser(); //Create gpxParser Object
gpx.parse("<xml><gpx></gpx></xml>"); //parse gpx file from string data
```

### Use the gpx Object

```js
var totalDistance = gpx.distance;
var heightDifference = gpx.heightDifference;
```

# Documentation
Coming soon !

| Property  | Type | Description|
| ------------- | ------------- | ------------- | 
| xmlSource | XML | XML Object parsed from gpx string file | 
| jsonSource | JSON Object | JSON parsed data from xmlSource |
| trackpoints | Object | list of <trkpt> attributes and childnode tag|
| waypoints | Object | list of <wpt> attributes and childnode tag |
| routepoints | Object | list of <rtept> attributes and childnode tag |
| distance | Integer | Total distance in km |
| cumulDistance | Array | |
| elevation | Object | |
| heightDifference | Object | |

