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
    <!--<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>-->
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>

    <script src="http://j.maxmind.com/app/geoip.js"></script>
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
    <script type="text/javascript" src="js/markerclusterer.js"></script>
    <script type="text/javascript" src="js/map.Maker.js"></script>

    <script type="text/javascript" src="js/jquery.mousewheel.js"></script>
    <script type="text/javascript" src="js/jScrollPane.js"></script>

    <script type="text/javascript" src="data.json"></script>
    <link rel="stylesheet" type="text/css" href="css/storefinder.css" />
    <link rel="stylesheet" type="text/css" media="all" href="css/jScrollPane.css" />

    <script type="text/javascript" src="js/visual.js"></script>
    <script type="text/javascript" src="js/map-init.js"></script>

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
<div class="layout-side fade">
    <h1 class="h1-title">ÇEVREDEKİLER</h1> <br />
    <div id="sidebar" class="sidebar_item">
        
    </div>
</div>


</body>
</html>


