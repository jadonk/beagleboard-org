function main_action ()
 {
  if (this.isTransient())
   {
    return (this.notfound_action());
   }
  res.handlers["User"] = User();
  res.data.title = this.uri;
  if (this.render_skin == "homepage" || this.render_skin == "bare")
   {
    res.data.body = this.body;
    renderSkin(this.render_skin);
    return;
   }
  if (this.render_skin)
   res.data.body = this.renderSkinAsString(this.render_skin);
  else
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

function edit_action ()
 {
  var saveEdit = false;

  if (!session.user || !session.user["name"])
   {
    res.redirect(root.href("login") + "?target=" + this.href());
    return;
   }
  res.handlers["User"] = User();

  if
   (
    req.data["submit"]
    && req.data["body"]
   )
   {
    this.user = "" + session.user["name"];
    if ((this.render_skin == "bare") && (this.user == "blog.hangerhead.com"))
     {
      saveEdit = true;
     }
    else if (this.cleanBody())
     {
      this.is_xhtml = true;
      saveEdit = true;
     }
    var blocked_attribute = 
     {
      uri: true,
      submit: true,
      user: true,
      time: true
     };
    for (var x in req.data)
     {
      if (!blocked_attribute[x])
       this[x] = req.data[x];
     }
    if (saveEdit)
     {
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
      var runtime = Packages.java.lang.Runtime.getRuntime();
      var message = "http://beagleboard.org" + this.href() + " was edited by " + session.user["name"];
      runtime.exec("scripts/beagle/edit.sh");
      if (false && this.href() != global.lastPageUpdated)
       {
        global.logbot.sendMessage('#beagle', message);
	global.logbot.append(3, message, "BeagleBot");
       }
      global.lastPageUpdated = this.href();
      this.time = new Date();
      res.redirect(this.href());
      return;
     }
   }
  res.data.title = this.uri + " - edit";
  if (this.edit_skin)
   res.data.body = this.renderSkinAsString(this.edit_skin);
  else
   res.data.body = this.renderSkinAsString("edit");
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
    cleaner.setTreatDeprecatedTagsAsContent(true);
    //cleaner.useCdata(true);
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

function href (action)
 {
  if
   (
    this.pseudoParent 
    && (this.isTransient() || ("" + this.pseudoParent != "[object Page]"))
   )
   {
    return (this.pseudoParent.href() + this.uri + '/' + (action || ''));
   }
  return HopObject.prototype.href.apply(this, arguments);
 }

function notfound_action ()
 {
  res.handlers["User"] = User();
  res.data.body = "";

  try
   {
    var x = root.get("notfound");
    res.data.title = "" + x.uri;
    res.data.body += "" + x.body;
    res.data.lang += "" + x.lang;
   }
  catch(e)
   {
    res.data.title = "Page not found";
    res.data.body += "<h1>Error: Page not found</h1>";
    res.data.body += "<p>The requested page does not currently exist.</p>";
   }

  renderSkin("index");
 }

function getChildElement (name)
 {
  var x = this.get(name);
  if (!x)
   {
    x = root.get("default").get(name);
   }
  if (!x)
   {
    var notfound_body = "<h1>Error: Page not found</h1>";
    notfound_body += "<p>The requested page does not currently exist.</p>";
    x = new Page("system", name, notfound_body);
    x.pseudoParent = this;
   }
  return (x);
 }

