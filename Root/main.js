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
    thix.add(x);
    res.data.title = "Error: No 'default' page";
    res.data.body += "Error: Please initialize the database with a 'default' page";
   }

  renderSkin("index");
 }

