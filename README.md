# gpx-parser

*gpx-parser* is a lightweight JS library wich parse .gpx file and get or calculate some datas like
- gpx metadatas
- total and cumulate distances
- min, max, average, positive and negative height différence

# gpx ? What is this ?

Wikipedia say :
> GPX, or GPS Exchange Format, is an XML schema designed as a common GPS data format for software applications.

gpx files are based on xml with specific tags and attributes

For more information about gpx format see http://www.topografix.com/gpx_manual.asp

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
var heightDifference = gpx.elevation.heightDifference;
```

# Documentation

| Property  | Type | Description|
| ------------- | ------------- | ------------- |
| xmlSource | XML | XML Object parsed from gpx string file |
| jsonSource | JSON Object | JSON parsed data from xmlSource |
| trackpoints | Object | List of <trkpt> attributes and childnode tag|
| waypoints | Object | List of <wpt> attributes and childnode tag |
| routepoints | Object | List of <rtept> attributes and childnode tag |
| distance | Integer | Total distance in km |
| cumulDistance | Array | Distance from Startpoint to a waypoint |
| elevation | Object | min, max, average, negative and positive height difference |

#### xmlSource

*xmlSource* is a DOM object representation of the xml file. You can use DOM research function like `querySelector()` on it. *xmlSource* is automatically parsed, it a perfect representation of the gpx source file.

#### jsonSource

*jsonSource* is a JSON Object representation
**WIP**

#### trackpoints

*trackpoints* is an Object wich represent the `trk` tag with all child nodes and attributes :
- optional data like `name`, `desc`
- trkpts : list of all the trackpoints with child nodes and attributes (`lat`, `lon`, `ele`, `time`, `speed`, `desc`)

**Note :**
- *trackpoints* can be empty if the gpx file doesn't contain any `trk` tag
- data inside *trackpoints* depend on the construction of the gpx original file

#### waypoints

*waypoints* is an Object wich contain the representation of all the `wpt` tags with all the child nodes and the attributes : `lat`, `lon`, `ele`

**Note :**
- *waypoints* can be empty if the gpx file doesn't contain any `wpt` tag
- data inside *waypoints* depend on the construction of the gpx original file

#### routepoints

*routepoints* is an Object wich contain the representation of all the `rte` tags with all the child nodes and the attributes : `lat`, `lon`, `ele`

**Note :**
- *routepoints* can be empty if the gpx file doesn't contain any `wpt` tag
- data inside *routepoints* depend on the construction of the gpx original file

### distance

*distance* is a Integer wich represent total distance of the track in Kilometers.

### cumulDistance

*cumulDistance* is an array wich contain distance from Startpoint to a waypoint.

```javascript
console.log(gpx.cumulDistance[0]) //display 0
console.log(gpx.cumulDistance[1]) //display distance between point 0 and point 1
//[...]
console.log(gpx.cumulDistance[50]) //display distance between point 0 and point 50
```

### elevation
*elevation* is a Object wich contain min, max, average, negative and positive height difference of the track.

| Key | Value |
| --- | ----- |
| min | Minimum height      |
| max | Maximum height      |
| avg | Average height      |
| d+ | Positive height difference       |
| d- | Negative height difference      |
