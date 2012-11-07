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
    var orderedByDate = this.getOrderedView("time desc");
    var collection = orderedByDate.list();
   }
  catch (ex)
   {
    var collection = [];
    body = "<p>No children exist for this page</p>\n";
    return (body);
   }
   
  function fixUrl(param)
   {
    param = "" + param;
    if (param.search("http://") == -1 && param.search("https://") == -1) 
     param = "http://" + param;
    return (param);
   }
   
  if (collection[0].render_skin == "project")
   body += "<table id='projects'>\n";
  if (collection[0].render_skin == "cape")
   {
    body += "<table id='capes' border='1'>\n";
    body += "<tr><th>Cape Name</th><th>Submitter Name</th><th>Description</th></tr>\n";
   }
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
      body += '</small></td>';
      body += '<td><div class="g-plusone" data-href="'
       + 'http://beagleboard.org' + collection[i].href()
       + '" data-size="small">'
       + '</div></td>';
      body += '<td><small>'
       + encode(collection[i].shortdesc)
       + '</small></td><td><small>Registered by: '
       + collection[i].registrant
       + '<br>Updated: '
       + collection[i].time
       + '</small></td></tr>\n'
       ;
     }
    else if (collection[i].render_skin == "cape")
     {
      body += '<tr>\n';
      body +=
       ' <td><a href="' + collection[i].href() + '">'
       + collection[i].uri
       + '</a></td>\n' 
       ;
      body +=
       ' <td>'
       + collection[i].name
       + '</td>\n' 
       ;
      body += ' <td>' + collection[i].body + '</td>\n';
      if (collection[i].youtube_url)
       {
        var embed = ('' + collection[i].youtube_url).match(/(youtu.be|youtube.com)\/(.*)$/);
        if (embed && embed.length == 3)
	 {
          body += ' <td><iframe width="412" height="240" ';
	  body += 'src="http://www.youtube.com/embed/'
          body += embed[2];
	  body += '" frameborder="0" allowfullscreen></iframe></td>\n';
	 }
       }
      body += '</tr>\n';
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
  else if (collection[0].render_skin == "cape")
   body += "</table>\n";
  else
   body += "</ul>\n";
  return (body);
 }

