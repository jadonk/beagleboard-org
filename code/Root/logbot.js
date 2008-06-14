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
    var nick = "BeagleLogBotTest";
    var passwd = 'BeNice';  // change password
    var joinMessage = "This channel is logged: http://beagleboard.org/irclog";

    global.logbot = new Packages.org.jibble.logbot.LogBot(nick, logdir, joinMessage);
    global.logbot.connect(server);
    global.logbot.joinChannel(channel);
    global.logbot.sendMessage('NickServ','IDENTIFY '+ passwd);
    global.logbot.sendMessage('ChanServ','OP #beagle');
    //global.logbot.setTopic(channel,'Welcome to #Beagle | Discussion about the OMAP3 Beagle Board - http://beagleboard.org | Beagle search tools are on #dashboard at irc.gimp.org, NOT here ;) | Log is at http://beagleboard.org/chat');
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

/**
 * Copyright (C) 2008 Jason Kridner
 */

function chat_action ()
 {
  res.data.title = "chat";
  res.data.body = '<script src="/static/irclog.js" type="text/javascript"> </script>\n';
  res.data.body += '<ul id="navigation">\n';
  res.data.body += '</ul>\n';
  if(req.data["date"])
   {
    var logdate = req.data["date"];
    res.data.title += " - " + logdate;
    var logname = './apps/beagle/static/irclog/' + logdate + '.log';
    var log = new java.io.File(logname);
    var reader = new java.io.FileReader(log);
    var bufferedReader = new java.io.BufferedReader(reader);
    res.data.body += '<ol id="log">\n';
    do
     {
      line = bufferedReader.readLine();
      if(line)
       res.data.body += line + "\n";
     } while(line);
    res.data.body += '</ol>';
   }
  res.handlers["User"] = User();
  renderSkin("index");
 }
