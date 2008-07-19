function ownername_macro (param)
 {
  return ("" + this.ownername);
 }

function homepage_macro (param)
 {
  return ("" + this.homepage);
 }

function shortdesc_macro (param)
 {
  return ("" + this.shortdesc);
 }

function edit_project_action ()
 {
  if (!session.user || !session.user["name"])
   {
    res.redirect(root.href("login") + "?target=" + this.href());
    return;
   }
  res.handlers["User"] = User();

  if
   (
    req.data["submit"]
    && req.data["pname"]
   )
   {
    this.user = "" + session.user["name"];
    this.time = new Date();
    this.body = req.data["body"];
    this.lang = req.data["lang"];
    this.ownername = req.data["ownername"];
    this.owneremail = req.data["owneremail"];
    this.pname = req.data["pname"];
    this.shortdesc = req.data["shortdesc"];
    this.desc = req.data["desc"];
    this.version = req.data["version"];
    this.homepage = req.data["homepage"];
    this.repository = req.data["repository"];
    this.rssfeed = req.data["rssfeed"];
    this.downloadlink = req.data["downloadlink"];
    this.category = req.data["category"];
    this.platform = req.data["platform"];
    this.render_skin = "project";
    this.edit_skin = "edit_project";
    if (this.isTransient())
     {
      this.uri = req.data["uri"];
      app.log("Creating '" + this.uri + "'");
      this.pseudoParent.add(this);
     }
    else
     {
      app.log("Replacing '" + this.uri + "' with '" + req.data["uri"] + "'");
      this.uri = req.data["uri"];
     }
    res.redirect(this.href());
    return;
   }
  res.data.title = this.uri + " - edit_project";
  if (this.edit_skin)
   res.data.body = this.renderSkinAsString(this.edit_skin);
  else
   res.data.body = this.renderSkinAsString("edit_project");
  renderSkin("index");
 }

