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
    promptString += '<a href="' + path[i].href() + '">';
    if (("" + path[i].uri) == "undefined")
     {
      promptString += "BeagleBoard.org";
     }
    else
     {
      promptString += path[i].uri;
     }
    promptString += '</a>';
   }
   /*
  do
   {
    var promptString = '<a href="' + obj.href() + '">' + obj + '</a>' +
     promptString;
   } while (obj = obj._parent);
   */
  return (promptString);
 }

