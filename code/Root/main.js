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
  res.data.body += "http_language = " + req.data["http_language"];
  res.handlers["User"] = User();
  renderSkin("index");
 }
