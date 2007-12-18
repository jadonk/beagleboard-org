/**
 * Copyright (C) 2007 Jason Kridner
 *
 * @author Jason Kridner
 */

function main_action ()
 {
  res.data.title = "Future home of BeagleBoard.Org"

  var str = "";
  try
   {
    for (var i = 0; i < root.size(); i++) 
     {
      var person = root.get(i);
      str += person.renderSkinAsString("link");
     }
    res.data.body = str;
   }
  catch(e)
   {
    res.data.body = "Str: " + str + "<br />\n";
    res.data.body = "Root: " + root + "<br />\n";
    res.data.body += "Exception: " + e + "<br />\nCall stack: " + e.stack;
   }

  res.handlers["User"] = User();
  renderSkin("index");
 }

function feed_action ()
 {
  res.data.title = "Future home of BeagleBoard.Org"
  //var feedURL = "http://beagleboard.blogspot.com/feeds/posts/default";
  var feedURL = "https://pibb.com/rss/channel/beagle";
  var feedData = Xml.get(feedURL);
  res.data.body = "feedData: " + feedData + "\n";

  var stackDepth = 0;

  function getType (myObject)
   {
    switch (typeof(myObject))
     {
      case "number":
       {
        return "number";
       }
      case "string":
       {
        return "string";
       }
      case "function":
       {
        return "function";
       }
      case "object":
       {
        if (myObject == null)
	 {
          return "null";
         }
        else if ("" + myObject == "[object HopObject]")
         {
          return ("hopobject");
         }
        else 
	 {
          var constr = myObject.constructor.toString();
          //return (constr);
          var reType = /^function\s(\w+?)\(/;
          var resultArr = reType.exec(constr);
          return (resultArr[1]);
         }
       }
     }
   }

  function explore (myObject)
   {
    res.data.body += "<ul>\n";
    //res.data.body += "<b>" + getType(myObject) + "</b>\n";
    switch (getType(myObject))
     {
      case "string":
       {
        res.data.body += " <li><b>(string):</b> " + myObject + "</li>\n";
        break;
       }
      case "number":
       {
        res.data.body += " <li><b>(number):</b> " + myObject + "</li>\n";
        break;
       }
      case "function":
       {
        res.data.body += " <li><b>(function):</b> " + myObject.toString(); + "</li>\n";
        break;
       }
      case "hopobject":
       {
        for (var key in myObject)
         {
          res.data.body += " <li><b>" + key + "</b>: " + myObject[key] + "</li>\n";
          explore(myObject[key]);
         }
        if(myObject.list)
         {
          explore(myObject.list());
         }
        break;
       }
      case "Array":
       {
        for (var i=0; i<=myObject.length; i++)
         {
          res.data.body += " <li><b>[" + i + "]</b>: " + myObject[i] + "</li>\n";
          explore(myObject[i]);
         }
        break;
       }
      case "Object":
       {
        if (myObject != null)
         {
          for (var key in myObject)
           {
            res.data.body += " <li>" + key + ": " + myObject + "</li>\n";
           }
         }
        else
         res.data.body += " <li><b>null</b></li>\n";
        break;
       }
     }
    res.data.body += "</ul>\n";
   }

  explore(feedData);
  res.handlers["User"] = User();
  renderSkin("index");
 }

