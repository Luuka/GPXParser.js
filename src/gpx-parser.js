var gpxParser = function () {
    this.xmlSource = "";
    this.metadata = {};
    this.waypoints = [];
    this.tracks = [];
    this.routes = [];
};

gpxParser.prototype.parse = function (string) {
    var keepThis = this;
    var domParser = new DOMParser();
    this.xmlSource = domParser.parseFromString(string, 'text/xml');

    metadata = this.xmlSource.querySelector('metadata');
    if(metadata != null){
        this.metadata.name  = this.getElementValue(metadata, "name");
        this.metadata.desc  = this.getElementValue(metadata, "desc");
        this.metadata.time  = this.getElementValue(metadata, "time");

        let author = {};
        let authorElem = metadata.querySelector('author');
        if(authorElem != null){
            author.name = this.getElementValue(authorElem, "name");

            author.email         = {};
            let emailElem        = authorElem.querySelector('email');
            if(emailElem != null){
                author.email.id      = emailElem.getAttribute("id");
                author.email.domain  = emailElem.getAttribute("domain");
            }

            let link     = {};
            let linkElem = authorElem.querySelector('link');
            if(linkElem != null){
                link.href    = linkElem.getAttribute('href');
                link.text    = this.getElementValue(linkElem, "text");
                link.type    = this.getElementValue(linkElem, "type");
            }
            author.link = link;
        }
        this.metadata.author = author;

        let link = {};
        let linkElem = metadata.querySelector('link');
        if(linkElem != null){
            link.href = linkElem.getAttribute('href');
            link.text = this.getElementValue(linkElem, "text");
            link.type = this.getElementValue(linkElem, "type");
            this.metadata.link = link;
        }
    }

    this.xmlSource.querySelectorAll('wpt').forEach(function(wpt){
        let pt  = {};
        pt.name = keepThis.getElementValue(wpt, "name")
        pt.lat  = parseFloat(wpt.getAttribute("lat"));
        pt.lon  = parseFloat(wpt.getAttribute("lon"));
        pt.ele  = parseFloat(keepThis.getElementValue(wpt, "ele")) || null;
        pt.cmt  = keepThis.getElementValue(wpt, "cmt");
        pt.desc = keepThis.getElementValue(wpt, "desc");
        keepThis.waypoints.push(pt);
    });

    this.xmlSource.querySelectorAll('rte').forEach(function(rte){
        let route = {};

        route.name   = keepThis.getElementValue(rte, "name");
        route.cmt    = keepThis.getElementValue(rte, "cmt");
        route.desc   = keepThis.getElementValue(rte, "desc");
        route.src    = keepThis.getElementValue(rte, "src");
        route.number = keepThis.getElementValue(rte, "number");
        route.link   = keepThis.getElementValue(rte, "link");
        route.type   = keepThis.getElementValue(rte, "type");

        let routepoints = [];
        rte.querySelectorAll('rtept').forEach(function(rtept){
            let pt    = {};
            pt.lat    = parseFloat(rtept.getAttribute("lat"));
            pt.lon    = parseFloat(rtept.getAttribute("lon"));
            pt.ele    = parseFloat(keepThis.getElementValue(rtept, "ele"));
            routepoints.push(pt);
        });

        route.distance = keepThis.calculDistance(routepoints);
        route.elevation = keepThis.calcElevation(routepoints);
        route.points = routepoints;
        keepThis.routes.push(route);
    });

    this.xmlSource.querySelectorAll('trk').forEach(function(trk){
        let track = {};

        track.name   = keepThis.getElementValue(trk, "name");
        track.cmt    = keepThis.getElementValue(trk, "cmt");
        track.desc   = keepThis.getElementValue(trk, "desc");
        track.src    = keepThis.getElementValue(trk, "src");
        track.number = keepThis.getElementValue(trk, "number");
        track.link   = keepThis.getElementValue(trk, "link");
        track.type   = keepThis.getElementValue(trk, "type");

        let trackpoints = [];
        trk.querySelectorAll('trkpt').forEach(function(trkpt){
            let pt = {};
            pt.lat = parseFloat(trkpt.getAttribute("lat"));
            pt.lon = parseFloat(trkpt.getAttribute("lon"));
            pt.ele = parseFloat(keepThis.getElementValue(trkpt, "ele")) || null;
            trackpoints.push(pt);
        });
        track.distance = keepThis.calculDistance(trackpoints);
        track.elevation = keepThis.calcElevation(trackpoints);
        track.points = trackpoints;
        keepThis.tracks.push(track);
    });
};

gpxParser.prototype.getElementValue = function(parent, needle){
    let elem = parent.querySelector(" :scope > " + needle);
    if(elem != null){
            return elem.innerHTML;
    }
    return elem;
}

gpxParser.prototype.calculDistance = function(points) {
    let distance = {};
    let totalDistance = 0;
    let cumulDistance = [];
    for (var i = 0; i < points.length - 1; i++) {
        totalDistance += this.calcDistanceBetween(points[i],points[i+1]);
        cumulDistance[i] = totalDistance;
    }
    cumulDistance[points.length - 1] = totalDistance;

    distance.total = totalDistance;
    distance.cumul = cumulDistance;

    return distance;
}

gpxParser.prototype.calcDistanceBetween = function (wpt1, wpt2) {
    let latlng1 = {};
    latlng1.lat = wpt1.lat;
    latlng1.lon = wpt1.lon;
    let latlng2 = {};
    latlng2.lat = wpt2.lat;
    latlng2.lon = wpt2.lon;
    var rad = Math.PI / 180,
		    lat1 = latlng1.lat * rad,
		    lat2 = latlng2.lat * rad,
		    sinDLat = Math.sin((latlng2.lat - latlng1.lat) * rad / 2),
		    sinDLon = Math.sin((latlng2.lon - latlng1.lon) * rad / 2),
		    a = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon,
		    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return 6371000 * c;
}


gpxParser.prototype.calcElevation = function (points) {
    var dp = 0,
        dm = 0,
        ret = {};

    for (var i = 0; i < points.length - 1; i++) {
        var diff = parseFloat(points[i + 1].ele) - parseFloat(points[i].ele);

        if (diff < 0) {
            dm += diff;
        } else if (diff > 0) {
            dp += diff;
        }
    }

    var elevation = [];
    var sum = 0;

    for (var i = 0, len = points.length; i < len; i++) {
        var ele = parseFloat(points[i].ele);
        elevation.push(ele);
        sum += ele;
    }

    ret.max = Math.max.apply(null, elevation) || null;
    ret.min = Math.min.apply(null, elevation) || null;
    ret.pos = Math.abs(dp) || null;
    ret.neg = Math.abs(dm) || null;
    ret.avg = sum / elevation.length || null;

    return ret;
};

gpxParser.prototype.isEmpty = function (obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true;
};
