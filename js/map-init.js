/*
 * @title Initialize Map
 *
 * Author: Taner DOGAN (hello@tanerdogan.com)
 * github.com/tanerdogan | @tanerdogan
 *
 */



var markers = [];
var center = new google.maps.LatLng(37.4419, -122.1419);
var bounds = new google.maps.LatLngBounds();
var infowindow = new google.maps.InfoWindow();


function initialize() {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        panControl: false,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        scaleControl: false,
        mapTypeControl: false
    });




    for (var i = 0; i < data.photos.length; i++) {
        var json = data.photos[i];
        var latLng = new google.maps.LatLng(json.latitude,
            json.longitude);
        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: json.title,
            description: '<div class="infowindow">'+json.title+'</div>' //TODO: change to "description" from json later
        });



        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(this.description);
            infowindow.open(map, this);
        });

        //if change zoom level then
        google.maps.event.addListener(map, 'zoom_changed', function() {
            // TODO
            });

        google.maps.event.addListener(map, 'center_changed', function() {
            //TODO
            });


        bounds.extend(latLng);
        sidebar(i, json.title);
        markers.push(marker);
    }
    var markerCluster = new MarkerClusterer(map, markers);
}

function sidebar(i, title){
    html = '<a href="javascript:sidebar_click(' + i + ')">' + title + '<\/a><br>';
    $(".sidebar_item").append("<p>"+html+"</p><br />");
}

//allows sidebar links to access markers
function sidebar_click(i) {
    google.maps.event.trigger(markers[i],"click");
}


google.maps.event.addDomListener(window, 'load', initialize);

