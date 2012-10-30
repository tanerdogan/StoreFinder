<?php
/*
 * @title
 *
 * Author: Taner DOGAN (hello@tanerdogan.com)
 * github.com/tanerdogan | @tanerdogan
 *
 */
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
    <head>
        <meta http-equiv="Content-Language" content="en" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Store Finder</title>
    <script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
    <script src="http://j.maxmind.com/app/geoip.js"></script>
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
    <script type="text/javascript" src="js/markerclusterer.js"></script>
    <script type="text/javascript" src="data.json"></script>



    <link href='http://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="css/storefinder.css" />




    <script type="text/javascript">

        $(document).ready(function(){
            $(".fade").mouseenter(function () {
                $(this).fadeTo( "normal", 1);
            }).mouseleave(function(){
                $(this).fadeTo( "slow", 0.6);
            });
        });


        function initialize() {
            var center = new google.maps.LatLng(37.4419, -122.1419);

            var infowindow = new google.maps.InfoWindow();

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

            var markers = [];
            for (var i = 0; i < 100; i++) {
                var dataPhoto = data.photos[i];
                var latLng = new google.maps.LatLng(dataPhoto.latitude,
                dataPhoto.longitude);
                var marker = new google.maps.Marker({
                    position: latLng
                });

                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent('test<br />test,Texas');
                    infowindow.open(map, marker);
                    console.log(i);
                });

                markers.push(marker);
            }
            var markerCluster = new MarkerClusterer(map, markers);


        }



        google.maps.event.addDomListener(window, 'load', initialize);
    </script>

</head>
<body>

<div class="layout-center">
    <div id="map"></div>
</div>






<div class="layout-north fade">
    <div class="title">
        <h1>STORE<strong>FINDER</strong></h1>
    </div>
    <a href="#" class="header-button">BUTTON</a>
    <a href="#" class="header-button">BUTTON</a>
    <a href="#" class="header-button">BUTTON</a>
    <a href="#" class="header-button">BUTTON</a>
</div>
<div class="layout-side fade">Side Bar</div>


</body>
</html>


