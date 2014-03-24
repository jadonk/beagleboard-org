/**
 * Copyright (©) 2007 Jason Kridner
 *
 * @author Jason Kridner
 */

function breadcrumb_macro (param)
 {
  var breadcrumbs = [];
  var obj = this;
  var promptString = "";
  for (var i = 0; i < path.length; i++)
   {
    if (i > 0)
     {
      promptString += ' &rsaquo; ';
     }
    if ((("" + path[i].uri) == "null") && (("" + path[i]) == "[object User]"))
     {
      promptString += '<a href="' + path[i].href() + '">';
      promptString += "user";
     }
    else if ((("" + path[i].uri) == "null") && (("" + path[i]) == "[object user]"))
     {
      promptString += '<a href="/user/' + path[i].name + '">';
      promptString += "" + path[i].name;
     }
    else if ((("" + path[i].uri) == "undefined") && (("" + path[i]) == "[object Root]"))
     {
	  promptString += '<a href="/">';
      promptString += "BeagleBoard.org";
     }
    else if (path[i].href())
     {
      promptString += '<a href="' + path[i].href() + '">';
      promptString += path[i].uri;
     }
    else
     {
      promptString += path[i].uri;
     }
    promptString += '</a>';
   }
  return (promptString);
 }

