
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
    x.page = req.data["page"];
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
  if (!session.user || !session.user["name"]) 
   {
    res.redirect(root.href());
    return;
   }

  if (req.data["submit"]) 
   {
    var x = new Page();
    x.user = session.user["name"];
    x.page = req.data["page"];
    x.body = req.data["body"];
    x.lang = req.data["lang"];
    x.time = new Date();
    root.add(x);
    res.redirect(x.href());
   }

  res.data.action = "create";
  res.handlers["User"] = User();
  res.data.body = root.renderSkinAsString("edit");
  renderSkin("index");
 }

function main_action ()
 {
  res.handlers["User"] = User();
  res.data.body = root.renderSkinAsString("page");
  renderSkin("index");
 }

function constructor (user, page, body, lang)
 {
  this.user = "" + user;
  this.page = "" + page;
  this.body = "" + body;
  this.lang = "" + lang;
  this.time = new Date();
 }

