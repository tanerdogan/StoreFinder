var geocoder;
var map;
var marker;
var customMarker = new google.maps.MarkerImage('../images/custom.png');

function getNavGeoLocation(){
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


function initialize(latitude, longitude){
    //MAP
    var latlng = new google.maps.LatLng(latitude,longitude);
    var options = {
        zoom: 12,
        center: latlng,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map_canvas"), options);

    //GEOCODER
    geocoder = new google.maps.Geocoder();

    marker = new google.maps.Marker({
        map: map,
        icon: customMarker,
        draggable: false
    });

    marker.setPosition(latlng);


    geocoder.geocode({
        'latLng': marker.getPosition()
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                $('#address').val(results[0].formatted_address);
                $('#latitude').val(marker.getPosition().lat());
                $('#longitude').val(marker.getPosition().lng());

            }
        }
    });


    //Add listener to marker for reverse geocoding
//    google.maps.event.addListener(marker, 'dragend', function() {
//        geocoder.geocode({
//            'latLng': marker.getPosition()
//        }, function(results, status) {
//            if (status == google.maps.GeocoderStatus.OK) {
//                if (results[0]) {
//                    $('#address').val(results[0].formatted_address);
//                    $('#latitude').val(marker.getPosition().lat());
//                    $('#longitude').val(marker.getPosition().lng());
//                    var point = marker.getPosition();
//                    map.panTo(point);
//
//                }
//            }
//        });
//    });




}


function getQuerystring(key, default_)
{
    if (default_==null)
    {
        default_="";
    }
    var search = unescape(location.search);
    if (search == "")
    {
        return default_;
    }
    search = search.substr(1);
    var params = search.split("&");
    for (var i = 0; i < params.length; i++)
    {
        var pairs = params[i].split("=");
        if(pairs[0] == key)
        {
            return pairs[1];
        }
    }
    return default_;
}



$(document).ready(function() {
    //var la = getQuerystring("la", 0);
    var la = $("#la").val();
    var lo = $("#lo").val();
    if ((la.length > 0) && (lo.length > 0)) {
        initialize(la, lo); // edit mode sucks!
    } else  getNavGeoLocation();      // default


});