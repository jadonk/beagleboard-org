function getChildElement (name)
 {
  var x = app.getUser(name);
  if (x.page)
   {
    x = x.page;
   }
  return (x);
 }

function main_action ()
 {
  res.handlers["Page"] = Page();

  if (("" + this) == "[object user]")
   {
    if ("" + this.name == session.user["name"])
     {
      // Create the user_page for this user
      var x = new Page(this.name, "user_page", "");
      x.registrant = this.name;
      x.uri = this.name;
      x.pseudoParent = this;
      this.page = x;

      // Reload this as a Page
      res.redirect(root.href("user") + "/" + this.name);
     }
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

function href (action)
 {
  if (("" + this) == "[object user]")
   {
    return (root.href("user") + "/");
   }
  else
   {
    return HopObject.prototype.href.apply(this, arguments);
   }
 }

