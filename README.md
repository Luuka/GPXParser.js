![GPXParser](https://raw.githubusercontent.com/Luuka/gpx-parser/feature/new-demo/demo/Logo.png)

# GPXParser.js

![](https://github.com/Luuka/gpx-parser/workflows/master-ci/badge.svg) ![](https://github.com/Luuka/gpx-parser/workflows/develop-ci/badge.svg)

*GPXParser.js* is a lightweight JS library wich parse .gpx file and get or compute various datas like
- GPX metadata
- total and cumulate distances
- min, max, average, positive and negative height différence

# GPX ? What is this ?

Wikipedia say :
> GPX, or GPS Exchange Format, is an XML schema designed as a common GPS data format for software applications.

gpx files are based on xml with specific tags and attributes

For more information about gpx format see http://www.topografix.com/gpx_manual.asp

# How to do

### Install from npm
`npm install --save gpxparser` 

### Load JavaScript file

From an HTML document :
```html
<script src="./js/GPXParser.js"></script>
```

From a node.js script :
```js
let gpxParser = require('gpxparser');
```

### Create and parse file
```js
var gpx = new gpxParser(); //Create gpxParser Object
gpx.parse("<xml><gpx></gpx></xml>"); //parse gpx file from string data
```

### Use the gpx Object

```js
var totalDistance = gpx.tracks[0].distance.total;
```

### Export gpxParser Objecto to GeoJSON

```js
let geoJSON = gpx.toGeoJSON();
```           

# Documentation

| Property  | Type | Description|
| ------------- | ------------- | ------------- |
| xmlSource | XML | XML Object parsed from gpx string file |
| metadata | Metadata object | File metadata |
| waypoints | Array of Waypoint object | Array of waypoints |
| tracks | Array of Track object | Array of waypoints of tracks |
| routes | Array of Route object | Array of waypoints of routes |

## Metadata object

| Property | Type   | Description       |
| -------- | ------ | ----------------- |
| name      | String | File name |
| desc      | String | Description |
| link      | Link object | Web address  |
| author    | Float  | Author object    |
| time      | DateTime  | Time   |


## Waypoint object
| Property | Type   | Description       |
| -------- | ------ | ----------------- |
| name     | String | Point name |
| cmt      | String | Comment           |
| desc     | String | Point description |
| lat      | Float  | Point latitute    |
| lon      | Float  | Point longitude   |
| ele      | Float  | Point elevation   |
| time     | Date   | Point time        |

## Track object
| Property | Type   | Description       |
| -------- | ------ | ----------------- |
| name     | String | Point name |
| cmt      | String | Comment           |
| desc     | String | Point description |
| src      | String | Used device           |
| number      | String | Track identifier           |
| link      | String | Link to a web address           |
| type      | String | Track type           |
| points      | Array | Points object array |
| distance      | Distance Object | Distance informations about the Route |
| elevation      | Elevation Object | Elevation informations about the Route |
| slopes      | Float Array | Slope of each sub-segment|


## Route object
| Property | Type   | Description       |
| -------- | ------ | ----------------- |
| name     | String | Point name |
| cmt      | String | Comment           |
| desc     | String | Point description |
| src      | String | Used device           |
| number      | String | Track identifier           |
| link      | String | Link to a web address           |
| type      | String | Route type           |
| points      | Array | Points object array    |
| distance      | Distance Object | Distance informations about the Route |
| elevation      | Elevation Object | Elevation informations about the Route |
| slopes      | Float Array | Slope of each sub-segment|


## Point object
| Property | Type   | Description       |
| -------- | ------ | ----------------- |
| lat      | Float  | Point latitute    |
| lon      | Float  | Point longitude   |
| ele      | Float  | Point elevation   |
| time     | Date   | Point time        |


## Distance object
| Property | Type   | Description       |
| -------- | ------ | ----------------- |
| total      | Float  | Total distance of the Route/Track    |
| cumul      | Float  | Cumulative distance at each point of the Route/Track   |


## Elevation object
| Property | Type   | Description       |
| -------- | ------ | ----------------- |
| max      | Float  | Maximum elevation   |
| min      | Float  | Minimum elevation  |
| pos      | Float  | Positive elevation difference  |
| neg      | Float  | Negative elevation difference  |
| avg      | Float  | Average elevation |


## Author object
| Property | Type   | Description       |
| -------- | ------ | ----------------- |
| name      | String  | Author name   |
| email      | Email object  | Email address of the author |
| link      | Link object  | Web address |

## Email object
| Property | Type   | Description       |
| -------- | ------ | ----------------- |
| id      | String  | Email id   |
| domain | String  | Email domain |

## Link  object
| Property | Type   | Description       |
| -------- | ------ | ----------------- |
| href      | String  | Web address |
| text      | String  | Link text |
| type      | String  | Link type |
