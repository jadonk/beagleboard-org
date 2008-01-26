
function update_action ()
 {
  if (!session.user || !session.user["name"]) 
   {
    res.redirect(root.href());
    return;
   }

  if (req.data["submit"]) 
   {
    var x = new XmlPage();
    x.username = session.user["name"];
    x.xmltext = req.data["xmltext"];
    x.time = new Date();
    this.edit = x.id;
    this.add(x);
    res.redirect(x.href());
   }

  res.data.title = "Edit XML Entry";
  res.data.username = this.username;
  res.data.xmltext = this.xmltext;
  res.data.action = "edit";
  res.data.body = this.renderSkinAsString("xmledit");
  res.handlers["User"] = User();
  renderSkin("index");
 }

function create_action ()
 {
  if (req.data["submit"]) 
   {
    var x = new XmlPage();
    x.username = session.user["name"];
    x.xmltext = req.data["xmltext"];
    x.time = new Date();
    root.add(x);
    res.redirect(x.href());
   }

  res.data.title = "Create XML Entry";
  res.data.action = "create";
  res.data.body = this.renderSkinAsString("xmledit");
  res.handlers["User"] = User();
  renderSkin("index");
 }

function main_action ()
 {
  res.data.title = "XML Entry";
  res.data.body = this.renderSkinAsString("xmlpage");
  res.handlers["User"] = User();
  renderSkin("index");
 }

function constructor (xmltext)
 {
  this.username = "nobody";
  this.xmltext = "" + xmltext;
  this.time = new Date();
 }

