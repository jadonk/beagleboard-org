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
    var x = new Page("nobody", "default", "");
    root.add(x);
    res.data.title = "Error: No 'default' page";
    res.data.body += "Error: Please initialize the database with a 'default' page";
   }

  renderSkin("homepage");
 }

function info_action ()
 {
  res.data.title = "Application information";
  res.data.body = "<h1>Application information</h1>";
  res.data.body += "http_language = " + req.data["http_language"] + "<br />\n";
  res.data.body += "req.data = " + req.data + "<br />\n";
  res.handlers["User"] = User();
  renderSkin("index");
 }

function getChildElement (name)
 {
  var x = this.get(name);
  if (!x)
   {
    x = root.get("default").get(name);
   }
  if (!x)
   {
    var notfound_body = "<h1>Error: Page not found</h1>";
    notfound_body += "<p>The requested page does not currently exist.</p>";
    x = new Page("system", name, notfound_body);
    x.pseudoParent = this;
   }
  return (x);
 }

function login_action ()
 {
  var user = User();
  res.handlers["User"] = user;
  return (user.login_action())
 }

