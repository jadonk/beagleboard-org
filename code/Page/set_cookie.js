// This action adds custom flags to Page objects that can be used
// to trigger additional behaviors, such as other skins for rendering.
function set_cookie_action ()
 {
  if (req.data["use_alt"])
   res.setCookie("use_alt", req.data["use_alt"]);
  if (req.data["use_alt_skin"])
   res.setCookie("use_alt_skin", req.data["use_alt_skin"]);
  res.redirect(this.href());
 }
