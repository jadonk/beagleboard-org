function startTestbot ()
 {
  var server = "irc.freenode.net";
  var channel = "#beagle";
  var nick = "TestBot";
  var passwd = 'BeNice';  // change password
  var joinMessage = "I'm a test bot";

    global.testbot = new Packages.org.jibble.pircbot.PircBot();
    global.testbot.connect(server);
    global.testbot.joinChannel(channel);
    global.testbot.sendMessage('NickServ','IDENTIFY '+ passwd);
    global.testbot.sendMessage('ChanServ','OP #beagle');
    //global.testb.setTopic(channel,'Welcome to #Beagle | Discussion about the OMAP3 Beagle Board - http://beagleboard.org | Beagle search tools are on #dashboard at irc.gimp.org, NOT here ;) | Log is at http://beagleboard.org/chat');
 }

if (false && !global.testbot)
 {
  defineLibraryScope('testbot');
  startTestbot();
 }

