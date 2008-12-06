<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<?php
    include("config.inc.php");
?>

<html>

<head>

<title><?php echo("IRC Log for $channel on $server, collected by $nick"); ?></title>

<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<meta name="description" content="IRC Log for <?php echo($channel); ?>" />
<meta name="keywords" content="IRC Log for <?php echo($channel); ?>" />
<script src="/static/irclog/script.js" type="text/javascript"> </script>

<style type="text/css">
body {
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-size: 12px;
    color: #000000;
}
cite,q{font-style:normal}
ol,li{margin:0;padding:0;}
ol{list-style-type: disc;}
ol.log{list-style-type:none;}
q:before,q:after{content:""};
cite{font-style:normal;}
abbr{font-family: Courier New, Courier, mono; border:0;}
.topic span, .mode span, .nick-change span, .join span {color: #009200;}
.message {}
.notice span {color: #7b0000;}
.part span, .quit span {color: #00007b;}
.action span {color: #9c009c;}
.topic-change span {font-weight:bold;}
.ping span {color: #ff0000;}
</style>

</head>

<body>

<h1><?php echo($channel); ?> IRC Log</h1>

