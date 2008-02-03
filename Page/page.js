
function edit_action ()
 {
  if (!session.user || !session.user["name"]) 
   {
    res.redirect(root.href());
    return;
   }

  if (req.data["submit"]) 
   {
    var x = new Page();
    x.user = session.user["name"];
    x.uri = req.data["uri"];
    x.body = req.data["body"];
    x.lang = req.data["lang"];
    x.time = new Date();
    root.add(x);
    x.add(this);
    root.removeChild(this);
    res.redirect(x.href());
   }

  res.data.action = "edit";
  res.handlers["User"] = User();
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
    res.redirect(root.href("login"));
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
   }

  res.data.action = "create";
  res.handlers["User"] = User();
  res.data.title = this.uri;
  res.data.body = this.renderSkinAsString("edit");
  renderSkin("index");
 }

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

