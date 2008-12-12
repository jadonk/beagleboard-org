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
<link rel="stylesheet" href="/static/irclog/style.css" />
</head>

<body>

<h1><?php echo($channel); ?> IRC Log
on <a href="http://beagleboard.org">BeagleBoard.org</a></h1>
<p>Join the chat at <a href="http://beagleboard.org/chat">beagleboard.org/chat</a></p>

