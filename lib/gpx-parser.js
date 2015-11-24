var gpxParser = function() {
  this.xmlSource = "";
  this.jsonSource = "";
  this.trackpoints = {};
  this.waypoints = {};
  this.routepoints = {};

  this.distance = 0;
  this.cumulDistance = [];

  this.elevation = {};
  this.heightDifference = {};
};

gpxParser.prototype.parse = function(string) {
  var domParser = new DOMParser();
  var doc = domParser.parseFromString(string, 'text/xml');

  this.xmlSource = doc;
  this.jsonSource = xmlToJson(doc).gpx;

  if (this.jsonSource.trk !== undefined) {
    this.trackpoints = this.jsonSource.trk;
  }

  if (this.jsonSource.rte !== undefined) {
    this.routepoints = this.jsonSource.rte;
  }

  if (this.jsonSource.wpt !== undefined) {
    this.waypoints = this.jsonSource.wpt;
  }

  this.calcElevation();
  this.calcTotalDistance();

  function xmlToJson(xml) {
    var obj = {};

    if (xml.nodeType == 1) {
      if (xml.attributes.length > 0) {

        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj[attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) {
      obj = xml.nodeValue;
    }

    if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof(obj[nodeName]) == "undefined") {
          if (item.nodeType == 3) {
            obj = xmlToJson(item);
          } else {
            obj[nodeName] = xmlToJson(item);
          }

        } else {
          if (typeof(obj[nodeName].push) == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xmlToJson(item));
        }
      }
    }
    return obj;
  };
};

gpxParser.prototype.calcTotalDistance = function() {
  var trackpoints;


  if (!this.isEmpty(this.waypoints)) {
    trackpoints = this.waypoints;
  } else if (!this.isEmpty(this.trackpoints)) {
    trackpoints = this.trackpoints.trkseg.trkpt;
  } else if (!this.isEmpty(this.routepoints)) {
    trackpoints = this.routepoints;
  } else {
    trackpoints = null;
    console.error("There is no point to calcul total distance");
  }

  var dist = 0;
  this.cumulDistance.push(0);

  for (var i = 0; i < trackpoints.length - 1; i++) {
    dist += calcDistance(trackpoints[i], trackpoints[i + 1]);

    this.cumulDistance.push(dist);
  }

  this.distance = dist;

  function calcDistance(wp1, wp2) {
    var lat1 = parseFloat(wp1.lat);
    var lon1 = parseFloat(wp1.lon);
    var alt1 = parseFloat(wp1.ele);

    var lat2 = parseFloat(wp2.lat);
    var lon2 = parseFloat(wp2.lon);
    var alt2 = parseFloat(wp2.ele);

    var r = 6366;
    lat1 = lat1 * (Math.PI / 180);
    lat2 = lat2 * (Math.PI / 180);
    lon1 = lon1 * (Math.PI / 180);
    lon2 = lon2 * (Math.PI / 180);

    alt1 = alt1 / 1000;
    alt2 = alt2 / 1000;

    var dp = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin((lat1 - lat2) / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((lon1 - lon2) / 2), 2)));

    var d = dp * r;

    var h = Math.sqrt(Math.pow(d, 2) + Math.pow(alt2 - alt1, 2));

    return h;
  }

};


gpxParser.prototype.calcElevation = function() {

  var trackpoints;

  if (!this.isEmpty(this.waypoints)) {
    trackpoints = this.waypoints;
  } else if (!this.isEmpty(this.trackpoints)) {
    trackpoints = this.trackpoints.trkseg.trkpt;
  } else if (!this.isEmpty(this.routepoints)) {
    trackpoints = this.routepoints;
  }

  var dp = 0,
    dm = 0,
    ret = {};

  for (var i = 0; i < trackpoints.length - 1; i++) {
    var diff = parseFloat(trackpoints[i + 1].ele) - parseFloat(trackpoints[i].ele);

    if (diff < 0) {
      dm += diff;
    } else if (diff > 0) {
      dp += diff;
    }
  }

  var elevation = [];
  var sum = 0;

  for (var i = 0, len = trackpoints.length; i < len; i++) {
    var ele = parseFloat(trackpoints[i].ele);
    elevation.push(ele);
    sum += ele;
  }

  this.elevation = elevation;

  ret["max"] = Math.max.apply(null, elevation);
  ret["min"] = Math.min.apply(null, elevation);

  ret["d+"] = dp;
  ret["d-"] = dm;

  ret["avg"] = sum / elevation.length;

  this.heightDifference = ret;
};

gpxParser.prototype.isEmpty = function(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop))
      return false;
  }
  return true;
};
