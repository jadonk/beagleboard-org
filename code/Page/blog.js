
function edit_blog_action ()
 {
  if
   (
    req.data["submit"]
    && req.data["uri"]
    && req.data["body"]
    && req.data["pname"]
    && req.data["shortdesc"]
   )
   {
    this.render_skin = "blog";
    this.edit_skin = "edit_blog";
   }

  var saveEdit = false;

  //if(this.edit_skin == 'edit_project') return(res.redirect());

  if (!session.user || !session.user["name"])
   {
    var targetURL = root.href("login") + "?target=" + this.href();
    res.redirect(targetURL);
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
      time: true,
      body: true,
      lang: true,
      use_alt: true
     };
    for (var x in req.data)
     {
      if (!blocked_attribute[x])
       this[x] = req.data[x];
     }
    var alt = req.data["use_alt"];
    if (alt && this.alt && this.alt[alt])
     {
      this.alt[alt].body = req.data.body;
      this.alt[alt].lang = req.data.lang;
     }
    else
     {
      this.body = req.data.body;
      this.lang = req.data.lang;
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
        app.log("Replacing page '" + this.uri + "' with '" + req.data["uri"] + "'");
        this.uri = req.data["uri"];
       }
      var runtime = Packages.java.lang.Runtime.getRuntime();
      var message = "http://beagleboard.org" + this.href() + " was edited by " + session.user["name"];
      runtime.exec("scripts/beagle/edit.sh");
      var currentTime = new Date();
      if (typeof bot === 'undefined')
       {
        global.defineLibraryScope("bot");
        bot.lastSpoke = currentTime;
       }
      var timeSinceUpdate = currentTime - this.time;
      var timeSinceNotice = currentTime - bot.lastSpoke;
      app.log("Previous edit was " + timeSinceUpdate/1000 + "s ago");
      app.log("Previous notice was " + timeSinceNotice/1000 + "s ago");
      this.time = new Date();
      res.redirect(this.href());
      return;
     }
   }
  res.data.title = this.uri + " - edit_blog";
  res.data.body = this.renderSkinAsString("edit_blog");
  renderSkin("index");
 }

