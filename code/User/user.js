function getChildElement (name)
 {
  return (app.getUser(name));
 }

function main_action ()
 {
  if (("" + this) == "[object user]")
   {
    res.data.title = "" + this.name;
    res.data.body = "<h1>" + this.name + "</h1>\n";
    renderSkin("index");
   }
  else
   {
    res.data.title = "Users";
    res.data.body = "<h1>Registered Users</h1>\n";
    res.data.body += "<ul>\n";
    var u = app.getRegisteredUsers();
    for (n in u)
     {
      t = u[n].name;
      res.data.body += '<li><a href="/user/' + t + '">' + t + '</a></li>\n';
     }
    res.data.body += "</ul>\n";
    renderSkin("index");
   }
 }

