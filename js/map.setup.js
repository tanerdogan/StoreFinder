var location1;
var location2;

var latlng;
var geocoder;
var map;

var line;

var infowindow1;
var infowindow2;

var distance;

function getNavGeoLocationFrom(){
    // console.log("hereee");
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(

            function (position) {
                initialize(position.coords.latitude,position.coords.longitude);
            },

            function (error)
            {
                switch(error.code)
                {
                    case error.TIMEOUT:
                        alert ('Timeout');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert ('Position unavailable');
                        break;
                    case error.PERMISSION_DENIED:
                        alert ('Permission denied');
                        break;
                    case error.UNKNOWN_ERROR:
                        alert ('Unknown error');
                        break;
                }
            }
            );
    }
}

// finds the coordinates for the two locations and calls the showMap() function
function initialize(l1a, l1b)
{
    location1 = new google.maps.LatLng(l1a, l1b);

    // console.log(l1);

    l2 = document.getElementById("location2").value;
    l2a = l2.split(",");
    location2 = new google.maps.LatLng(l2a[0], l2a[1]);

    showMap();
}

// creates and shows the map
function showMap()
{
    //  console.log(location1.lat());

    latlng = new google.maps.LatLng((location1.lat()+location2.lat())/2,(location1.lng()+location2.lng())/2);

    // get the map type value from the hidden field
    var maptype = document.getElementById("maptype").value;

    var typeId;

    if (maptype == "roadmap")
        typeId = google.maps.MapTypeId.ROADMAP;
    else if (maptype == "hybrid")
        typeId = google.maps.MapTypeId.HYBRID;
    else if (maptype == "satellite")
        typeId = google.maps.MapTypeId.SATELLITE;
    else if (maptype == "terrain")
        typeId = google.maps.MapTypeId.TERRAIN;


    // set map options
    // set zoom level
    // set center
    // map type
    var mapOptions =
    {
        zoom: 11,
        center: latlng,
        mapTypeId: typeId
    };

    // create a new map object
    // set the div id where it will be shown
    // set the map options
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    // event listener to update the map type
    google.maps.event.addListener(map, 'maptypeid_changed', function() {
        maptype = map.getMapTypeId();
        document.getElementById('maptype').value = maptype;
    });

    // custom marker
    var here = new google.maps.MarkerImage('/multitarim/images/car.png');
    var there = new google.maps.MarkerImage('/multitarim/images/multipin.png');

    // create the markers for the two locations
    var marker1 = new google.maps.Marker({
        map: map,
        position: location1,
        title: "",
        icon: here,
        draggable: false
    });

    var marker2 = new google.maps.Marker({
        map: map,
        position: location2,
        title: "",
        icon: there,
        draggable: false
    });



    // add action events so the info windows will be shown when the marker is clicked

    //   google.maps.event.addListener(marker1, 'click', function() {
    //        infowindow1.open(map,marker1);
    //    });
    //    google.maps.event.addListener(marker2, 'click', function() {
    //        infowindow2.open(map,marker2);
    //    });

    // add action events for dragging the markers
    google.maps.event.addListener(marker1, 'dragend', function() {
        location1 = marker1.getPosition();
        drawRoutes(location1, location2);
    });

    google.maps.event.addListener(marker2, 'dragend', function() {
        location2 = marker2.getPosition();
        drawRoutes(location1, location2);
    });

    // initialize directions service
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer(
    {
        suppressMarkers: true,
        suppressInfoWindows: true
    });

    directionsDisplay.setMap(map);

    drawRoutes(location1, location2);


}

function drawRoutes(location1, location2)
{
    // show new addresses


    continueShowRoute(location1, location2);

}

function continueShowRoute(location1, location2)
{
    // hide last line
    if (line)
    {
        line.setMap(null);
    }

    // compute distance between the two points
    var R = 6371;
    var dLat = toRad(location2.lat()-location1.lat());
    var dLon = toRad(location2.lng()-location1.lng());

    var dLat1 = toRad(location1.lat());
    var dLat2 = toRad(location2.lat());

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(dLat1) * Math.cos(dLat1) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;


    var travelmode = "driving"; //document.getElementById("travelMode").value;

    // get the selected travel mode
    if (travelmode == "driving")
        travel = google.maps.DirectionsTravelMode.DRIVING;
    else if (travelmode == "walking")
        travel = google.maps.DirectionsTravelMode.WALKING;
    else if (travelmode == "bicycling")
        travel = google.maps.DirectionsTravelMode.BICYCLING;

    // find and show route between the points
    var request = {
        origin:location1,
        destination:location2,
        travelMode: travel
    };
    directionsService.route(request, function(response, status)
    {
        if (status == google.maps.DirectionsStatus.OK)
        {
            directionsDisplay.setDirections(response);
            distance = "The distance between the two points on the chosen route is: "+response.routes[0].legs[0].distance.text;
            distance += "<br/>The aproximative "+travelmode+" time is: "+response.routes[0].legs[0].duration.text;


            document.getElementById("distance_road").value = response.routes[0].legs[0].distance.text;
            document.getElementById("distance_direct").value = response.routes[0].legs[0].duration.text;


            mesafeler = document.getElementsByName("mesafe");
            for(i = 0;i< mesafeler.length; i++)
            {
                mesafeler[i].value = document.getElementById("distance_road").value;
            }

        }
        else
        {
        //  console.log('error (ugghh): ' + status);
        }
    });


//infowindow1.setContent("Siz Buradasınız.");
//infowindow2.setContent("Multi Tarım Burada.");

}

function toRad(deg)
{
    return deg * Math.PI/180;
}

