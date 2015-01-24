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
    var sort = "time desc";
    var orderedByDate = this.getOrderedView(sort);
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

  var coolBoris = "/static/graphics/coolboris.png"
   

  if (collection[0].render_skin == "project")
   {
    body += '<script type="text/javascript" charset="utf8" src="/static/jquery.dataTables.min.js"></script>\n';
    body += '<script type="text/javascript" charset="utf8" src="/static/dataTables.titleSort.js"></script>\n';
    body += '<script type="text/javascript" charset="utf8" src="/static/bb_projlist_dt.js"></script>\n';

    body += "<br /><div id='loadmsg' style='text-align:center;'><br /><br /><img src='/static/graphics/spinning-wheel.gif'><br /><br />Loading Projects...</div><table id='projects' style='display:none;'>\n";
    body += "<thead><tr><th style='width: 350px;'>Project</th><th style='width: 180px;'>Updated</th><th style='width: 120px;'>Views</th><th>Category</th><th>Board</th><th>Status</th></tr></thead><tbody>\n";
    //body += "<thead><tr><th style='width: 350px;'>Project</th><th style='width: 180px;'>Updated</th><th style='width: 120px;'>Views</th><th>Category</th><th>Board</th><th>Status</th><th>Trend</th></tr></thead><tbody>\n";
   }
  else if (collection[0].render_skin == "cape")
   {
    body += "<table id='capes' class='cape-table' border='1'>\n";
    body += "<thead>\n";
    body += "<tr><th width='120px' class='cape-table-col1'>Entry</th>";
    body += "<th width='300px' class='cape-table-col2'>Description</th>";
    body += "<th width='425px' class='cape-table-col3'>Youtube Video</th></tr>\n";
    body += "</thead>\n";
    body += "<tbody>\n";
    collection = collection.reverse();
   }
  else if (collection[0].render_skin == "blog")
   {
    var sort = "uri desc";
    var orderedByDate = this.getOrderedView(sort);
    collection = orderedByDate.list();
    body += "<table id='articlelist' style='width:675px;'>\n";
   }
  else
   {
    body += "<ul>\n";
   }

  for (var i in collection) {
    var prjDate = new Date();
    prjDate = Date.parse(collection[i].time);

    if (collection[i].render_skin == "project")
     {
      body += '<tr><td width="70%"><span title="' + collection[i].pname + '"></span>';

      if (collection[i].imageFile == undefined || collection[i].imageFile == '')
       {
        body += '<div style="float:left;height:50px;width:50px;margin-right:7px;"><a href="' + collection[i].href() + '"><img src="' + coolBoris + '" style="height:50px;width:50px;" class="thumb-img" /></a></div>';
       }
      else
       {
        if ( collection[i].imageFile.length < 10000 )
         {
          body += '<div style="float:left;height:50px;width:50px;margin-right:7px;"><a href="' + collection[i].href() + '"><img src="' + collection[i].imageFile + '" style="height:50px;width:50px;" class="thumb-img" /></a></div>';
         }
        else
         {
          body += '<div style="float:left;height:50px;width:50px;margin-right:7px;"><a href="' + collection[i].href() + '"><img src="' + coolBoris + '" data-src="' + collection[i].href() + 'image" style="height:50px;width:50px;" class="thumb-img lazy-load" /></a></div>';
         }
       }

      var sRegistrant = collection[i].registrant;
      var sRegurl = '';

      if (sRegistrant.indexOf('http') > -1) 
       {
        sRegUrl = sRegistrant;
       }
      else if (sRegistrant.indexOf('/') == -1)
       { 
        sRegUrl = '/user/' + sRegistrant;
       }
      else
       {
        sRegUrl = 'https://' + sRegistrant;
       }

      if (sRegistrant.length > 32)
       {
        sRegistrant = sRegistrant.substring(0, 29) + '...';
       }

      body += '<a href="' + collection[i].href() + '">';
      body += collection[i].pname + '</a>';
      if (collection[i].homepage && collection[i].homepage.length > 0)
       {
        body += ' (&nbsp;<a target="_blank" class="external" href="';
        body += collection[i].homepage;
        body += '">*</a>&nbsp;)';
       }
      //var trend = Math.random().toFixed(2);
      body += '<br><small>'
       + encode(collection[i].shortdesc)
       + '</small></td><td><small>'
       + '<span title="' + i + '" style="display: none;">' + collection[i].time.valueOf() + '</span>'
       + collection[i].time
       + '</small><br />'
       + '<a href="' + sRegUrl + '">' + sRegistrant.replace(/\@.*$/, "") + '</a>'
       + '</td>'
       + '<td>' + (collection[i].pvCount == undefined ? 0 : collection[i].pvCount) + '</td>'
       + '<td>' + collection[i].category + '</td>'
       + '<td>' + collection[i].boardType + '</td>'
       + '<td>' + collection[i].prj_Status + '</td>'
       //+ '<td>' + trend + '</td>'
       + '</tr>\n';
     }
    else if (collection[i].render_skin == "cape")
     {
      body += '<tr>\n';
      body += ' <td><a href="' + collection[i].href() + '">'
       + collection[i].uri
       + '</a>' 
       + ' by '
       + collection[i].name
       + '<br /><br /><div class="fb-like" data-send="false" data-width="40" data-layout="button_count" data-show-faces="false" href="'
       + 'http://beagleboard.org' + collection[i].href()
       + '">'
       + '</div>'
       + '<br /><br /><div class="wants-g-plusone" data-href="'
       + 'http://beagleboard.org' + collection[i].href()
       + '" data-size="small">'
       + '</div>'
       + '<br /><br /><a href="https://twitter.com/share" '
       + 'data-text="My favorite #BeagleBone #CapeContest entry is '
       + collection[i].uri + '!" '
       + 'class="twitter-share-button" data-size="small" data-lang="en" data-url="'
       + 'http://beagleboard.org' + collection[i].href()
       + '">Tweet'
       + '</a>'
       + '</td>\n';
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
    else if (collection[i].render_skin == "blog")
     {
      var postbody = collection[i].body;
      var tempPos = postbody.indexOf('>', postbody.indexOf('<h1')) + 1;
      var postTitle = postbody.substr(tempPos, postbody.indexOf('</h1>') - tempPos);

      if (postTitle.length < 2) {
        tempPos = postbody.indexOf('>', postbody.indexOf('<h3')) + 1;
        postTitle = postTitle = postbody.substr(tempPos, postbody.indexOf('</h3>') - tempPos);
      }

      tempPos = postbody.indexOf('>', postbody.indexOf('<p')) + 1;
      var postSummary = postbody.substr(tempPos, postbody.indexOf('</p>') - tempPos);

      if (postSummary.indexOf('By') > -1) {
        var newStart = postbody.indexOf('</p>') + 4;
        tempPos = postbody.indexOf('>', postbody.indexOf('<p', newStart)) + 1;
        postSummary = postbody.substr(tempPos, postbody.indexOf('</p>', newStart) - tempPos);
      }

      body +=
       '<tr><td>' + i + '</td><td><h1><a href="' + collection[i].href() + '">'
       + (postTitle.length > 3 ? postTitle : collection[i].uri) 
       + '</a></h1><div class="blogInfo">' + collection[i].time
       + '</div><div class="summary">' + ( postSummary.length > 3 ? postSummary : ' ')
       + '</div><div style="text-align:right;"><a href="' + collection[i].href() + '">Read more</a> &raquo;</div></td></tr>\n';
     }
    else
     {
      body +=
       '<li><a href="' + collection[i].href() + '">'
       + collection[i].uri
       + '</a>&nbsp;&nbsp;&nbsp;&nbsp;'
       + '<small>Last updated by: '
       + collection[i].user
       + '</small>'
       + '</li>\n';
    }
   }

  if (collection[0].render_skin == "project") 
   {
    body += "</tbody></table>\n";
   }
  else if (collection[0].render_skin == "cape")
   {
    body += "</tbody></table>\n";
   }
  else if (collection[0].render_skin == "blog")
   {
    body += "</table>\n";
   }
  else
   {
    body += "</ul>\n";
   }
  return (body);
 
}
