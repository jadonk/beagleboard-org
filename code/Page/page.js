function main_action()
 {
  if (this.isTransient())
   {
    return (this.create_action());
   }
  res.handlers["User"] = User();
  res.data.title = this.uri;
  res.data.body = this.renderSkinAsString("page");
  renderSkin("index");
 }

function constructor(user, uri, body)
 {
  this.user = "" + user;
  this.uri = "" + uri;
  this.body = "" + body;
  this.time = new Date();
 }

function edit_action()
 {
  if (!session.user || !session.user["name"])
   {
    res.redirect(root.href("login") + "?target=" + this.uri);
    return;
   }

  if
   (
    req.data["submit"]
    && req.data["body"]
    && this.cleanBody()
   )
   {
    this.user = "" + session.user["name"];
    this.body = req.data["body"];
    app.log("Replacing '" + this.uri + "'");
    res.redirect(this.href());
    return;
   }

  res.handlers["User"] = User();
  res.data.action = "edit";
  res.data.title = this.uri;
  res.data.body = this.renderSkinAsString("edit");
  renderSkin("index");
 }

function create_action()
 {
  if 
   (
    !session.user 
    || !session.user["name"]
   ) 
   {
    res.redirect(root.href("login") + "?target=/");
    return;
   }

  if 
   (
    req.data["submit"]
    && req.data["uri"]
    && req.data["body"]
    && this.cleanBody()
   )
   {
    var x = new Page
     (
      session.user["name"],
      req.data["uri"],
      req.data["body"]
     );
    if (this.isTransient())
     {
      root.add(x);
     }
    else
     {
      this.add(x);
     }
    res.redirect(x.href());
    return;
   }

  res.handlers["User"] = User();
  res.data.title = this.uri + " - create";
  if (this.create_skin)
   {
    res.data.body = this.renderSkinAsString(this.create_skin);
   }
  else
   {
    res.data.body = this.renderSkinAsString("create");
   }
  renderSkin("index");
 }

function info_action ()
 {
  res.data.title = "Page information";
  res.data.body = "<h1>Page information</h1>";
  res.data.body += "this.uri = " + this.uri;
  res.data.body += "<br>this.body = " + this.body;
  res.data.body += "<br>this.user = " + this.user;
  res.data.body += "<br>this.time = " + this.time;
  res.handlers["User"] = User();
  renderSkin("index");
 }

function cleanBody()
 {
  try
   {
    XML.prettyIndent = 1;
    var cleaner = new Packages.org.htmlcleaner.HtmlCleaner
     (
      '<html><body><div id="body">' 
      + req.data["body"] +
      '</div></body></html>'
     );
    cleaner.setOmitUnknownTags(true);
    cleaner.clean();
    var s = "" + cleaner.getXmlAsString();
    var x = new XML(s);
    req.data["body"] = "" + x..body.div;
    req.data["body"] = req.data["body"]
     .replace(/^<div id="body">/, "")
     .replace(/<\/div>$/, "")
    return (true);
   }
  catch (ex)
   {
    app.log("cleanBody failed with exception: " + ex);
    return (false);
   }

  return (false);
 }

function href(action)
 {
  if (this.pseudoParent && this.isTransient())
   {
    return (this.pseudoParent.href() + 'new/' + (action || ''));
   }
  return HopObject.prototype.href.apply(this, arguments);
 }


/*
Note that we've done nothing to prevent actions besides /edit from being accessed on the 
temp object--actions which probably don't make sense for a temp object. That's not really
an issue for my application, but you could address it several ways, including (probably 
easiest) an onRequest handler for GenericType or the type(s) that inherit from it.
*/
