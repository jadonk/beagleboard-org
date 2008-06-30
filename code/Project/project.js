function main_action ()
 {
  res.handlers["User"] = User();
  if (this.uri == "")
   {
    res.data.title = this.name;
    res.data.body += "<h1>Current list of projects</h1>";
    res.data.body += "<ul>\n";
   }
  else
   {
    res.data.title = this.name;
    res.data.body =
     "Project Name: " + this.uri + "<br>Project Owner:" + this.ownername
     + "<br>Summary: " + this.shortdesc
     + "<br>URL: <a href='" + this.homepage + "' target=_blank>" + this.homepage + "</a>"
     + "<br>" + "Submitted by:" + this.user + "<br>";
   }

  res.data.body = this.renderSkinAsString("page");
  renderSkin("index");
 }

function join_action ()
 {
  if
   (
    !session.user
    || !session.user["name"]
   )
   {
    res.redirect(root.href("login") + "?target=project/join");
    return;
   }
  res.handlers["User"] = User();

  if (req.data.submit && req.data["pname"] != "")
   {
     var x =
      new Project("system",
       req.data["pname"],
       req.data["pfirstname"] + " " + req.data["plastname"],
       req.data["email"],
       req.data["pabout"],
       req.data["pdesc"],
       req.data["pversion"],
       req.data["phomepage"],
       req.data["prepository"],
       req.data["prssfeed"],
       req.data["pdownload"],
       req.data["pcategory"],
       req.data["pplatform"]
      );

     root.get("project").add(x);
     res.data.title = "Join Project";
     res.data.body = "Project has been added.";
     renderSkin("index");
    }
   else
    renderSkin("register_p");
 }

function constructor ()
 {
  // from Page object
  this.user = session.user["name"];
  this.uri = "";
  this.body = "";
  this.time = new Date();
 }

function constructor
 (
  user, pname, ownername, email, about, desc, version, homepage, repository,
  rssfeed, downloadlink, category, platform
 )
 {
  // from Page object
  this.user = user;
  this.uri = pname;
  this.body = "";
  this.time = new Date();

  this.ownername = ownername;
  this.owneremail = email;
  this.shortdesc = about;
  this.desc = desc;
  this.version = version;
  this.homepage = homepage;
  this.repository = repository;
  this.rssfeed = rssfeed;
  this.downloadlink = downloadlink;
  this.category = category;
  this.platform = platform;
 }

