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

  //renderSkin("homepage");
  renderSkin("index");
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

function notfound_action ()
 {
  res.data.body = "";
  res.handlers["User"] = User();

  try
   {
    var x = root.get("notfound");
    res.data.title = "" + x.uri;
    res.data.body = "" + x.body;
   }
  catch(e)
   {
    res.data.title = "Page not found";
    res.data.body += "<h1>Error: Page not found</h1>";
    res.data.body += "<p>The requested page does not currently exist.</p>";
   }

  renderSkin("index");
 }

function join_project_action ()
 {
  if
   (
    !session.user
    || !session.user["name"]
   )
   {
    res.redirect(root.href("login") + "?target=join_project");
    return;
   }
  res.handlers["User"] = User();

  if (req.data.submit && req.data["pname"] != "")
   {
     var x =
      new Project("system",
       req.data["pname"],
       req.data["pfirstname"] + " " + req.data["plastname"],
       req.data["email"],
       req.data["pabout"],
       req.data["pdesc"],
       req.data["pversion"],
       req.data["phomepage"],
       req.data["prepository"],
       req.data["prssfeed"],
       req.data["pdownload"],
       req.data["pcategory"],
       req.data["pplatform"]
      );

     root.get("project").add(x);
     res.data.title = "Join Project";
     res.data.body = "Project has been added.";
     renderSkin("index");
    }
   else
    renderSkin("register_p");
 }
