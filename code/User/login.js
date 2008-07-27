function login_action ()
 {
  if (req.data["target"])
   {
    res.redirect(req.data["target"]);
   }
  var x = root.get("login");
  res.data.title = x.uri;
  res.data.body = x.renderSkinAsString("login");
  renderSkin("index");
 }

