function startHopbot() {
 var logdir = new java.io.File('./hopbotlog');
 logdir.mkdirs();
 if (logdir.isDirectory()) {
  var server = "irc.freenode.net";
  var channel = "#helma";
  var nick = "hopbot";
  var passwd = 'xxxxxxx';  // change password
  var joinMessage = "This channel is logged: http://helma.zumbrunn.com/hopbot/";

  global.hopbot = new Packages.org.jibble.logbot.LogBot(nick, logdir, joinMessage);
  global.hopbot.connect(server);
  global.hopbot.joinChannel(channel);
  global.hopbot.sendMessage('NickServ','IDENTIFY '+ passwd);
  global.hopbot.sendMessage('ChanServ','OP #helma');
  global.hopbot.setTopic(channel,'Just ask your question :-) and paste code at http://helma.pastebin.com/ - visit http://helma.zumbrunn.com/hopbot/ for channel logs.');
 }
 else
  global.hopbot = "Couldn't create log directory";
}

if (!global.hopbot) {
 defineLibraryScope('hopbot');
 startHopbot();
}

