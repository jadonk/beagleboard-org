function list_action ()
 {
  // Handles action for displaying the children of a page
  res.handlers["User"] = User();
  res.data.title = this.uri + " - list";
  res.data.body = this.listBody();
  renderSkin("index");
 }

function listBody ()
 {
  var body = "";
  try
   {
    var orderedByDate = this.getOrderedView("uri");
    var collection = orderedByDate.list();
   }
  catch (ex)
   {
    var collection = [];
    //body += "<p>No children exist for this page</p>\n";
   }
   
  function fixUrl(param)
   {
    param = "" + param;
    if (param.search("http://") == -1 && param.search("https://") == -1) 
     param = "http://" + param;
    return (param);
   }
   
  if (collection[0].render_skin == "project")
   body += "<table>\n";
  else
   body += "<ul>\n";
  for (var i in collection)
   {
    if (collection[i].render_skin == "project")
     {
      body +=
       '<tr><td><a href="' + collection[i].href() + '">'
       + collection[i].pname
       + '</a><br><small>' 
       ;
      if (("" + collection[i].homepage) != "")
       {
        body += ''
	 + '[<a href="'
         + fixUrl(collection[i].homepage)
         + '" target="_blank">homepage</a>] '
	 ;
       }
      if (("" + collection[i].rssfeed) != "")
       {
        body += ''
	 + '[<a href="'
         + fixUrl(collection[i].rssfeed)
         + '" target="_blank">rss</a>]'
	 ;
       }
      body += '</small></td><td><small>'
       + encode(collection[i].shortdesc)
       + '</small></td><td><small>Last updated by: '
       + collection[i].registrant
       + '<br>'
       + collection[i].updatetime
       + '</small></tr>\n'
       ;
     }
    else if (collection[i].render_skin == "rss")
     {
      body +=
       '<li class="rss"><a href="' + collection[i].href() + '">'
       + collection[i].uri
       + '</a>'
       + '<div>'
       + collection[i].body
       + '</div></li>\n';
     }
    else
     {
      body +=
       '<li><a href="' + collection[i].href() + '">'
       + collection[i].uri
       + '</a>&nbsp;&nbsp;&nbsp;&nbsp;<small>Last updated by: '
       + collection[i].user
       + '</small></li>\n';
     }
   }
  if (collection[0].render_skin == "project")
   body += "</table>\n";
  else
   body += "</ul>\n";
  return (body);
 }

