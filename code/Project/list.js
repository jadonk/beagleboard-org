function list_action ()
 {
  // Handles action for displaying the 'project/list' page
  res.handlers["User"] = User();
  res.data.title = "list";
  res.data.body = "";

  try
   {
    var orderedByDate = root.get("project").getOrderedView("time desc");
    var collection = orderedByDate.list();
   }
  catch (ex)
   {
    var collection = [];
    res.data.body += "<li>No projects currently registered</li>\n";
   }
  
  for (var i in collection)
   {
    if (collection[i] instanceof Project)
     res.data.body +=
      '<li><a href="/project/' + collection[i].uri + '">'
      + collection[i].uri
      + '</a>&nbsp;&nbsp;&nbsp;&nbsp;<small>submitted by: '
      + collection[i].user
      + '</small></li>\n';
   }
  res.data.body += "</ul>\n";
  renderSkin("index");
 }
