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
  body += "<ul>\n";
  for (var i in collection)
   {
    body +=
     '<li><a href="' + collection[i].href() + '">'
     + collection[i].uri
     + '</a>&nbsp;&nbsp;&nbsp;&nbsp;<small>Last updated by: '
     + collection[i].user
     + '</small></li>\n';
   }
  body += "</ul>\n";
  return (body);
 }
