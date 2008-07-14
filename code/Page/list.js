function list_action ()
 {
  // Handles action for displaying the children of a page
  res.handlers["User"] = User();
  res.data.title = this.uri + " - list";
  res.data.body = "";

  try
   {
    var orderedByDate = this.getOrderedView("uri");
    var collection = orderedByDate.list();
    //var collection = this._children;
   }
  catch (ex)
   {
    var collection = [];
    res.data.body += "<p>No children exist for this page</p>\n";
   }
  
  res.data.body += "<ul>\n";
  for (var i in collection)
   {
    //if (collection[i] instanceof Page)
     res.data.body +=
      '<li><a href="' + collection[i].href() + '">'
      + collection[i].uri
      + '</a>&nbsp;&nbsp;&nbsp;&nbsp;<small>Last updated by: '
      + collection[i].user
      + '</small></li>\n';
   }
  res.data.body += "</ul>\n";
  renderSkin("index");
 }
