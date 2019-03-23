let map;
let tracksLayer;

function buildPolyline(points){
    let latlngs = [];

    points.forEach(function(pt){
        let p = [pt.lat, pt.lon];
        latlngs.push(p);
    });

    let color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
    let polyline = L.polyline(latlngs, {color: color});

    tracksLayer.addLayer(polyline);
    map.fitBounds(tracksLayer.getBounds());
}

document.addEventListener('DOMContentLoaded', function() {

    map = L.map('map').setView([51.505, -0.09], 5);
    tracksLayer = L.featureGroup().addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    document.getElementById("loadGPXFile-form").addEventListener('submit', function(e){
        e.preventDefault();

        tracksLayer.clearLayers();

        gpx = new gpxParser();
        document.getElementById("title").innerHTML = "";
        document.getElementById("authorname").innerHTML = "";
        document.getElementById("authoremail").innerHTML = "";
        document.getElementById("authorlink").innerHTML = "";
        document.getElementById("waypoints").innerHTML = "";
        document.getElementById("tracks").innerHTML = "";
        document.getElementById("routes").innerHTML = "";

        let file = document.getElementById('loadGPXFile-input').files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
            gpx.parse(reader.result)
            if(gpx.metadata.name != null){
                document.getElementById('title').innerHTML = gpx.metadata.name;
            }

            if(gpx.metadata.author != undefined){
                if(gpx.metadata.author.name != null){
                    document.getElementById('authorname').innerHTML = gpx.metadata.author.name;
                }

                if(gpx.metadata.author.email != undefined){
                    let email = gpx.metadata.author.email;
                    if(email.id != null && email.domain != null){
                        document.getElementById('authoremail').innerHTML = email.id+"@"+email.domain;
                    }
                }

                if(gpx.metadata.author.link != undefined){
                    let link = gpx.metadata.author.link;
                    if(link.href != null && link.text != null){
                        document.getElementById('authorlink').innerHTML = '<a href="'+link.href+'">'+link.text+'</a>';
                    }
                }
            }

            gpx.waypoints.forEach(function(wpt){
                let tr = document.createElement('tr');

                let name = document.createElement('td');
                name.innerHTML = wpt.name;

                let lat  = document.createElement('td');
                lat.innerHTML = wpt.lat;

                let lon  = document.createElement('td');
                lon.innerHTML = wpt.lon;

                let ele  = document.createElement('td');
                ele.innerHTML = wpt.ele;

                let cmt  = document.createElement('td');
                cmt.innerHTML = wpt.cmt;

                let desc = document.createElement('td');
                desc.innerHTML = wpt.desc;

                tr.appendChild(name);
                tr.appendChild(lat);
                tr.appendChild(lon);
                tr.appendChild(ele);
                tr.appendChild(cmt);
                tr.appendChild(desc);

                document.getElementById('waypoints').appendChild(tr);

                tracksLayer.addLayer(L.marker([wpt.lat, wpt.lon]).bindPopup(wpt.name));

            });

            gpx.tracks.forEach(function(track){
                let tr = document.createElement('tr');

                let name = document.createElement('td');
                name.innerHTML = track.name;

                let desc = document.createElement('td');
                desc.innerHTML = track.desc;

                let distance = document.createElement('td');
                distance.innerHTML = Math.round((track.distance.total / 1000)*100)/100;

                let avg = document.createElement('td');
                avg.innerHTML = Math.floor(track.elevation.avg);

                let max = document.createElement('td');
                max.innerHTML = Math.floor(track.elevation.max);

                let min = document.createElement('td');
                min.innerHTML = Math.floor(track.elevation.min);

                let pos = document.createElement('td');
                pos.innerHTML = Math.floor(track.elevation.pos);

                let neg = document.createElement('td');
                neg.innerHTML = Math.floor(track.elevation.neg);

                tr.appendChild(name);
                tr.appendChild(desc);
                tr.appendChild(distance);
                tr.appendChild(avg);
                tr.appendChild(max);
                tr.appendChild(min);
                tr.appendChild(pos);
                tr.appendChild(neg);


                document.getElementById('tracks').appendChild(tr);

                buildPolyline(track.points);

            });

            gpx.routes.forEach(function(route){
                let tr = document.createElement('tr');

                let name = document.createElement('td');
                name.innerHTML = route.name;

                let desc = document.createElement('td');
                desc.innerHTML = route.desc;

                let distance = document.createElement('td');
                distance.innerHTML = Math.round((route.distance.total / 1000)*100)/100;

                let avg = document.createElement('td');
                avg.innerHTML = Math.floor(route.elevation.avg);

                let max = document.createElement('td');
                max.innerHTML = Math.floor(route.elevation.max);

                let min = document.createElement('td');
                min.innerHTML = Math.floor(route.elevation.min);

                let pos = document.createElement('td');
                pos.innerHTML = Math.floor(route.elevation.pos);

                let neg = document.createElement('td');
                neg.innerHTML = Math.floor(route.elevation.neg);

                tr.appendChild(name);
                tr.appendChild(desc);
                tr.appendChild(distance);
                tr.appendChild(avg);
                tr.appendChild(max);
                tr.appendChild(min);
                tr.appendChild(pos);
                tr.appendChild(neg);


                document.getElementById('routes').appendChild(tr);
            });

        };
        reader.readAsText(file);
    });
});
