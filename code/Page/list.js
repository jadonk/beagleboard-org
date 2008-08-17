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
   
  body += "<ul>\n";
  for (var i in collection)
   {
    if (collection[i].render_skin == "project")
     {
      body +=
       '<li><a href="' + collection[i].href() + '">'
       + collection[i].pname
       + '</a><small>&nbsp;&nbsp;&nbsp;' 
       + '- [<a href="'
       + fixUrl(collection[i].homepage)
       + '" target="_blank">homepage</a>]&nbsp;[<a href="'
       + fixUrl(collection[i].rssfeed)
       + '" target="_blank">rss</a>]<br>'
       + encode(collection[i].shortdesc)
       + '<br>Last updated by: '
       + collection[i].registrant
       + ' on '
       + collection[i].updatetime
       + '</small></li>\n';
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
  body += "</ul>\n";
  return (body);
 }

