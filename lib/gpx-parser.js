var gpxParser = function () {
    this.xmlSource = "";
    this.jsonSource = "";
    this.trackpoints = {};
    this.waypoints = {};
    this.routepoints = {};

    this.distance = 0;
    this.cumulDistance = [];

    this.elevation = {};
    this.deniv = {};
}

gpxParser.prototype.parse = function (string) {
    var doc = new DOMParser().parseFromString(string, 'text/xml');

    this.xmlSource = doc;
    this.jsonSource = xmlToJson(doc);

    if(this.jsonSource.trk != undefined){
        this.trackpoints = this.jsonSource.trk.trkpts;
    }

    if(this.jsonSource.rte != undefined){
        this.routepoints = this.jsonSource.rte.rtepts;
    }

    if(this.jsonSource.wpt != undefined){
        this.waypoints = this.jsonSource.wpt;
    }

    this.calcElevation();
    this.calcTotalDistance();

    /*****************************/
    /*****************************/
    /*****************************/

    function xmlToJson(xml) {
        var obj = {};

        if(xml.querySelector('bounds')){
            var xmlBounds = xml.querySelector('bounds');
            var bounds = [];

            for(var i=0;i<xmlBounds.attributes.length;i++){
                bounds[xmlBounds.attributes[i].name] = xmlBounds.attributes[i].value;
            }

            obj.bounds = bounds;
        }

        if(xml.querySelector('time')){
            obj.time = xml.querySelector('time').innerHTML;
        }

        if(xml.querySelector('rte')){
          var rte = xml.querySelector('rte');
          obj.rte = {};
          obj.rte.name = rte.querySelector('name').innerHTML;
          obj.rte.desc = rte.querySelector('desc').innerHTML;

          var rtept = xml.querySelectorAll('rtept');
          var rtepts = [];
          for(var i=0,len=rtept.length;i<len;i++){
            var pt = [];

            pt.lat = rtept[i].getAttribute('lat');
            pt.lon = rtept[i].getAttribute('lon');

            for(var j=0;j<rtept[i].childNodes.length;j++){
                pt[rtept[i].childNodes[j].tagName] = rtept[i].childNodes[j].innerHTML;
            }
            rtepts.push(pt);
          }
          obj.rte.rtepts = rtepts;
        }

        if(xml.querySelector('trk')){
          var trk = xml.querySelector('trk');
          obj.trk = {};

          if(trk.querySelector('name')){
            obj.trk.name = trk.querySelector('name').innerHTML;
          }

          if(trk.querySelector('desc')){
            obj.trk.desc = trk.querySelector('desc').innerHTML;
          }

          var trkpt = xml.querySelectorAll('trkpt');
          var trkpts = [];
          for(var i=0,len=trkpt.length;i<len;i++){
            var pt = [];

            pt.lat = trkpt[i].getAttribute('lat');
            pt.lon = trkpt[i].getAttribute('lon');

            for(var j=0;j<trkpt[i].childNodes.length;j++){
                pt[trkpt[i].childNodes[j].tagName] = trkpt[i].childNodes[j].innerHTML;
            }
            trkpts.push(pt);
          }
          obj.trk.trkpts = trkpts;
        }

        if(xml.querySelector('wpt')){

          var wpt = xml.querySelectorAll('wpt');
          var wpts = [];
          for(var i=0,len=wpt.length;i<len;i++){
            var pt = [];

            pt.lat = wpt[i].getAttribute('lat');
            pt.lon = wpt[i].getAttribute('lon');

            for(var j=0;j<wpt[i].childNodes.length;j++){
                pt[wpt[i].childNodes[j].tagName] = wpt[i].childNodes[j].innerHTML;
            }
            wpts.push(pt);
          }
          obj.wpt = wpts;
        }

        return obj;
    }
}

gpxParser.prototype.calcTotalDistance = function () {
    var trackpoints;

    if(!this.isEmpty(this.trackpoints)){
        trackpoints = this.trackpoints;
    }else if(!this.isEmpty(this.waypoints)){
        trackpoints = this.waypoints;
    }else if(!this.isEmpty(this.routepoints)){
        trackpoints = this.routepoints;
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

}


gpxParser.prototype.calcElevation = function () {

    var trackpoints;

    if(!this.isEmpty(this.trackpoints)){
        trackpoints = this.trackpoints;
    }else if(!this.isEmpty(this.waypoints)){
        trackpoints = this.waypoints;
    }else if(!this.isEmpty(this.routepoints)){
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

    for (var i = 0, len = trackpoints.length; i < len; i++) {
        elevation.push(parseFloat(trackpoints[i].ele));
    }

    this.elevation = elevation;

    ret["max"] = Math.max.apply(null, elevation);
    ret["min"] = Math.min.apply(null, elevation);

    ret["d+"] = dp;
    ret["d-"] = dm;

    this.deniv = ret;
}

gpxParser.prototype.isEmpty = function(obj){
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}
