var gpxParser = function () {
    this.xmlSource = "";
    this.jsonSource = "";
    this.waypoints = {};

    this.distance = 0;
    this.cumulDistance = [];

    this.elevation = {};
    this.deniv = {};
}



gpxParser.prototype.parse = function (string) {
    var doc = new DOMParser().parseFromString(string, 'text/xml');

    this.xmlSource = doc;
    this.jsonSource = xmlToJson(doc).gpx;

    this.waypoints = this.jsonSource.trk.trkseg.trkpt;

    this.calcElevation();
    this.calcTotalDistance();

    /*****************************/
    /*****************************/
    /*****************************/

    function xmlToJson(xml) {
        var obj = {};
        if (xml.nodeType == 1) {
            if (xml.attributes.length > 0) {
                obj["attrs"] = {};
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    obj["attrs"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType == 3) { // text
            obj = xml.nodeValue;
        }

        if (xml.hasChildNodes()) {
            for (var i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName;
                if (typeof (obj[nodeName]) == "undefined") {
                    obj[nodeName] = xmlToJson(item);
                } else {
                    if (typeof (obj[nodeName].push) == "undefined") {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(xmlToJson(item));
                }
            }
        }
        return obj;
    }
}

gpxParser.prototype.calcTotalDistance = function () {
    var waypoints = this.waypoints;

    var dist = 0;
    this.cumulDistance.push(0);

    for (var i = 0; i < waypoints.length - 1; i++) {
        dist += calcDistance(waypoints[i], waypoints[i + 1]);

        this.cumulDistance.push(dist);
    }

    this.distance = dist;

    /*****************************/
    /*****************************/
    /*****************************/

    function calcDistance(wp1, wp2) {
        var lat1 = parseFloat(wp1["attrs"].lat);
        var lon1 = parseFloat(wp1["attrs"].lon);
        var alt1 = parseFloat(wp1.ele["#text"]);

        var lat2 = parseFloat(wp2["attrs"].lat);
        var lon2 = parseFloat(wp2["attrs"].lon);
        var alt2 = parseFloat(wp2.ele["#text"]);

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

    var waypoints = this.waypoints;

    var dp = 0,
        dm = 0,
        ret = {};

    for (var i = 0; i < waypoints.length - 1; i++) {
        var diff = parseFloat(waypoints[i + 1].ele["#text"]) - parseFloat(waypoints[i].ele["#text"]);

        if (diff < 0) {
            dm += diff;
        } else if (diff > 0) {
            dp += diff;
        }
    }

    var elevation = [];

    for (var i = 0, len = waypoints.length; i < len; i++) {
        elevation.push(parseFloat(waypoints[i].ele["#text"]));
    }

    this.elevation = elevation;

    ret["max"] = Math.max.apply(null, elevation);
    ret["min"] = Math.min.apply(null, elevation);

    ret["d+"] = dp;
    ret["d-"] = dm;

    this.deniv = ret;
}
