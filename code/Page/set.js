// This action adds custom flags to Page objects that can be used
// to trigger additional behaviors, such as other skins for rendering.
function set_action ()
 {
  if (req.data["render_skin"])
   this.render_skin = req.data["render_skin"];
  if (req.data["edit_skin"])
   this.edit_skin = req.data["edit_skin"];
  res.redirect(this.href());
 }
