function news_url_macro (param)
 {
  if (req.data["news_url"])
   return ("" + req.data["news_url"]);
  else if (this.news_url)
   return ("" + this.news_url);
  else
   return "";
 }

function image_url_macro (param)
 {
  if (req.data["image_url"])
   return ("" + req.data["image_url"]);
  else if (this.image_url)
   return ("" + this.image_url);
   return "";
 }

function headline_macro (param)
 {
  if (req.data["headline"])
   return ("" + req.data["headline"]);
  else if (this.headline)
   return ("" + this.headline);
  else
   return "";
 }

function edit_news_action ()
 {
  if (!session.user || !session.user["name"])
   {
    var targetURL = root.href("login") + "?target=" + this.href();
    res.redirect(targetURL);
    return;
   }
  res.handlers["User"] = User();
  
  function cleanField(param)
  {
   if (param)
    return param.replace("\"","&quot;");
   else
    return "";
  }

  this.errmsg = "";

  this.uri = cleanField(this.uri);
  this.headline = cleanField(this.headline);
  this.news_url = cleanField(this.news_url);
  this.image_url = cleanField(this.image_url);

  if
   (
    req.data["submit"]
    && req.data["uri"]
    && req.data["headline"]
    && req.data["news_url"]
   )
   {
    this.user = "" + session.user["name"];
    this.headline = req.data["headline"];
    this.news_url = req.data["news_url"];
    this.image_url = req.data["image_url"];
    this.updatetime = new Date();
    this.edit_skin = "edit_news";
    if (this.isTransient())
     {
      this.time = new Date();
      this.uri = req.data["uri"];
      this.registrant = "" + session.user["name"];
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
  else if(req.data["submit"])
   {
    if (!req.data["headline"]) this.errmsg += "* Headline is a required field<br />\n";
    if (!req.data["news_url"]) this.errmsg += "* News URL is a required field<br />\n";
    if (!req.data["uri"]) this.errmsg += "* News item name/URI is a required field<br />\n";
   }
  res.data.title = this.uri + " - edit_news";
  res.data.body = this.renderSkinAsString("edit_news");
  renderSkin("index");
 }
