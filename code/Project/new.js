function new_action()
 {
  if
   (
    !session.user
    || !session.user["name"]
   )
   {
    res.redirect(root.href("login") + "?target=/project/new");
    return;
   }
  res.handlers["User"] = User();

  if (req.data.submit && req.data["pname"] != "")
   {
     var x =
      new Project(session.user["name"],
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
     res.data.title = "New Project";
     res.data.body = "Project has been added.";
     res.redirect = x.href();
     return;
    }
   else
    {
     res.data.title = "New Project";
     res.data.body = this.renderSkinAsString("register_p");
     renderSkin("index");
    }
 }
