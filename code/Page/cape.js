function ownername_macro (param)
 {
  return ("" + this.ownername);
 }

function youtube_embed_macro (param)
 {
  var embed = ('' + this.youtube_url).match(/(youtu.be|youtube.com)\/.*\?v=(.*)$/);
  if (!embed)
   return ('' + this.youtube_url);
  else if (embed.length == 3)
   return ('<iframe width="640" height="360" src="http://www.youtube.com/embed/'
    + embed[2] + '" frameborder="0" allowfullscreen></iframe>');
  else
   return ('<a href="' + this.youtube_url + '>' + this.youtube_url + '</a>');
 }

function edit_macro (param)
 {
  var uri = req.path.replace(/\/$/,"");
  if (uri != "")
   uri = "/" + uri + "/";
  promptString = '<a href="' + uri + 'edit">Edit</a>';
  if (session.user && session.user["name"] == this.registrant && uri != "")
   return (promptString);
  return ("");
 }

function homepage_macro (param)
 {
  return ("" + this.homepage);
 }

function updatetime_macro (param)
 {
  return ("" + this.updatetime);
 }

function htmlencode_macro (param)
 {
  return encode("" + eval(param.param));
 }
 
function edit_cape_action ()
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
  this.name = cleanField(this.name);
  this.email = cleanField(this.email);
  this.project_url = cleanField(this.project_url);
  this.youtube_url = cleanField(this.youtube_url);

  if
   (
    req.data["submit"]
    && req.data["uri"]
    && req.data["body"]
    && req.data["name"]
    && req.data["email"]
    && req.data["project_url"]
   )
   {
    this.user = "" + session.user["name"];
    this.body = req.data["body"];
    this.name = req.data["name"];
    this.email = req.data["email"];
    this.project_url = req.data["project_url"];
    this.youtube_url = req.data["youtube_url"];
    this.updatetime = new Date();
    this.render_skin = "cape";
    this.edit_skin = "edit_cape";
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
    if (!req.data["body"]) this.errmsg += "* Full Description is a required field<br />\n";
    if (!req.data["name"]) this.errmsg += "* Your name is a required field<br />\n";
    if (!req.data["email"]) this.errmsg += "* Your e-mail is a required field<br />\n";
    if (!req.data["project_url"]) this.errmsg += "* Project URL is a required field<br />\n";
    if (!req.data["uri"]) this.errmsg += "* Cape name/URI is a required field<br />\n";
   }
  res.data.title = this.uri + " - edit_cape";
  if (this.edit_skin)
   res.data.body = this.renderSkinAsString(this.edit_skin);
  else
   res.data.body = this.renderSkinAsString("edit_cape");
  renderSkin("index");
 }

function showCapeInfoTbl_macro (param)
 {
  var str = "";

  function fixUrl (param)
   {
    param = "" + param;
    if
     (
      (param.search("http://") == -1)
      && (param.search("https://") == -1)
     )
     param = "http://" + param;
    return (param);
   }
	
  if (("" + this.project_url) != "")
   {
    str += "<tr>\n"
     + "  <td valign=\"top\" class=\"tbl3\" align=\"right\">Project URL</td>\n"
     + "  <td class=\"tbl5\"><a href=\"" + fixUrl(this.project_url) + "\" target=\"_blank\">"
     + fixUrl(this.project_url)
     + "</a></td>"
     + "</tr>";
   }

  if ((("" + this.email) != "") && (("" + this.name) != ""))
   {
    str += "<tr>\n"
     + "  <td valign=\"top\" class=\"tbl3\" align=\"right\">Author</td>\n"
     + "  <td class=\"tbl5\"><a href=\"mailto:" + this.email + "\">"
     + this.name
     + "</a></td>\n"
     + "</tr>";
   }

  return (str);
 }

