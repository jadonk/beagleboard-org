function main_action ()
 {
  res.handlers["User"] = User();
  res.data.title = this.name;
  res.data.body =
   "Project Name: " + this.uri + "<br>Project Owner:" + this.ownername
   + "<br>Summary: " + this.shortdesc
   + "<br>URL: <a href='" + this.homepage + "' target=_blank>" + this.homepage + "</a>"
   + "<br>" + "Submitted by:" + this.user + "<br>";
  renderSkin("index");
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

