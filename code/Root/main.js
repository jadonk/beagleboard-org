/**
 * Copyright (C) 2007 Jason Kridner
 *
 * @author Jason Kridner
 */

function main_action ()
 {

  res.data.body = "";
  res.handlers["User"] = User();

  try
   {
    var x = root.get("default");
    res.data.title = "" + x.uri;
    res.data.body = "" + x.body;
   }
  catch(e)
   {
    var x = new Page("nobody", "default", "", "en-us");
    root.add(x);
    res.data.title = "Error: No 'default' page";
    res.data.body += "Error: Please initialize the database with a 'default' page";
   }

  renderSkin("index");
 }

function info_action ()
 {
  res.data.title = "Application information";
  res.data.body = "<h1>Application information</h1>";
  res.data.body += "http_language = " + req.data["http_language"] + "<br />\n";
  var lang = req.data["lang"];
  res.data.body += "lang = " + lang + "<br />\n";
  if (!lang)
   {
    lang = req.data["http_language"];
   }
  var langs = [];
  for (var t in lang.split(";"))
   {
    for (var u in (lang.split(";")[t]).split(","))
     {
      var v = (lang.split(";")[t]).split(",")[u];
      if (!v.match("q="))
       {
        langs[langs.length] = v;
       }
     }
   }
  res.data.body += "langs = " + langs + "<br />\n";
  res.data.body += "req.data = " + req.data + "<br />\n";
  res.handlers["User"] = User();
  renderSkin("index");
 }
