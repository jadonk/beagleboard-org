function listside_macro ()
 {
  // Handles action for displaying the children of a page
  return this.listTops();
 }

function listTops ()
 {
  var body = "";
  try
   {
    var sort = "pvCount desc";
    var orderedByCount = this.getOrderedView(sort);
    var collection = orderedByCount.list();
   }
  catch (ex)
   {
    var collection = [];
    body = "";
    return (body);
   }
   
   body += "<h2>Most Popular Posts</h2><table id='topList'>\n";

  for (var i in collection) {

      var postbody = collection[i].body;
      var postTitle = postbody.substr((postbody.indexOf('<h1>') + 4), postbody.indexOf('</h1>') - (postbody.indexOf('<h1>') + 4));

    if (collection[i].pvCount != undefined) {
      body +=
       '<tr><td><h3><a href="' + collection[i].href() + '">'
       + (postTitle.length > 3 ? postTitle : collection[i].uri )
       + '</a> &raquo;</h3></td><td>' + collection[i].pvCount + '</td></tr>\n';
    }
  }

    body += "</table>\n";

  return (body);
 
}
