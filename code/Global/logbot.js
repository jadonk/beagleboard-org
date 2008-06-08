// Taken from zumbrunn (http://helma.zumbrunn.net/hopbot/2008-03-07)
// Uses http://www.jibble.org/logbot/ and http://www.jibble.org/pircbot.php
// Patched with http://rbach.priv.at/Patches/LogBot-20051116.diff
// Built into mflogbot.jar.

function startLogbot() 
 {
  var logdir = new java.io.File('./apps/beagle/static/irclog');
  logdir.mkdirs();
  if (logdir.isDirectory()) 
   {
    var server = "irc.freenode.net";
    var channel = "#beagle";
    var nick = "BeagleLogBot";
    var passwd = 'BeNice';  // change password
    var joinMessage = "This channel is logged: http://beagleboard.org/irclog";

    global.logbot = new Packages.org.jibble.logbot.LogBot(nick, logdir, joinMessage);
    global.logbot.connect(server);
    global.logbot.joinChannel(channel);
    global.logbot.sendMessage('NickServ','IDENTIFY '+ passwd);
    global.logbot.sendMessage('ChanServ','OP #beagle');
    global.logbot.setTopic(channel,'Welcome to #Beagle | Discussion about the OMAP3 Beagle Board - http://beagleboard.org | Beagle search tools are on #dashboard at irc.gimp.org, NOT here ;) | Log is at http://beagleboard.org/irclog');
   }
  else
   global.logbot = "Couldn't create log directory";
 }

if (!global.logbot) 
 {
  defineLibraryScope('logbot');
  try
   {
    startLogbot();
   }
  catch(ex)
   {
    app.log("Could not start the logbot due to execption: " + ex);
   }
 }

