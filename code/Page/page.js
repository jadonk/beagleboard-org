function main_action ()
 {
  res.handlers["User"] = User();
  res.data.title = this.uri;
  res.data.body = this.renderSkinAsString("page");
  renderSkin("index");
 }

function constructor (user, uri, body, lang)
 {
  this.user = "" + user;
  this.uri = "" + uri;
  this.body = "" + body;
  this.lang = "" + lang;
  this.time = new Date();
 }

function edit_action ()
 {
  if (!session.user || !session.user["name"]) 
   {
    res.redirect(root.href("login") + "?target=" + this.uri);
    return;
   }

  if (req.data["submit"]) 
   {
    var x = new Page
     (
      session.user["name"],
      this.uri,
      req.data["body"],
      this.lang
     );
    app.log("Replacing '" + this.uri + "' object with " + x._id + " from " + this._id);
    root.add(x);
    x.prev = this;
    root.removeChild(this);
    res.redirect(x.href());
    return;
   }

  res.handlers["User"] = User();
  res.data.action = "edit";
  res.data.title = this.uri;
  res.data.body = this.renderSkinAsString("edit");
  renderSkin("index");
 }

function create_action ()
 {
  if 
   (
    !session.user 
    || !session.user["name"] 
   ) 
   {
    res.redirect(root.href("login") + "?target=default");
    return;
   }

  if 
   (
    req.data["submit"]
    && req.data["uri"]
    && req.data["lang"]
    && req.data["body"]
   )
   {
    var x = new Page
     (
      session.user["name"],
      req.data["uri"],
      req.data["body"],
      req.data["lang"]
     );
    root.add(x);
    res.redirect(x.href());
    return;
   }

  res.handlers["User"] = User();
  res.data.action = "create";
  res.data.title = "Create new page";
  res.data.body = this.renderSkinAsString("create");
  renderSkin("index");
 }

function append_action ()
 {
  if (!session.user || !session.user["name"]) 
   {
    res.redirect(root.href("login") + "?target=" + this.uri);
    return;
   }

  if (req.data["submit"]) 
   {
    var x = new Page();
    x.user = session.user["name"];
    x.uri = this.uri;
    x.body = this.body + req.data["body"];
    x.lang = this.lang;
    x.time = new Date();
    root.add(x);
    x.add(this);
    root.removeChild(this);
    res.redirect(x.href());
    return;
   }

  res.handlers["User"] = User();
  res.data.action = "append";
  res.data.title = this.uri;
  res.data.body = this.renderSkinAsString("append");
  renderSkin("index");
 }

function info_action ()
 {
  res.data.title = "Page information";
  res.data.body = "<h1>Page information</h1>";
  res.handlers["User"] = User();
  renderSkin("index");
 }

/*
function translate_action ()
 {
  if (!session.user || !session.user["name"]) 
   {
    res.redirect(root.href("login") + "?target=" + this.uri);
    return;
   }

  if (req.data["submit"]) 
   {
    var x = new Page
     (
      session.user["name"],
      this.uri,
      req.data["body"],
      req.data["lang"],
     );
    app.log("Adding translation for '" + this.uri + "' object with " + x._id + " from " + this._id);
    this.alt.add(x);
    res.redirect(x.href());
    return;
   }

  res.handlers["User"] = User();
  res.data.action = "translate";
  res.data.title = this.uri;
  res.data.body = this.renderSkinAsString("translate");
  renderSkin("index");
 }
*/
