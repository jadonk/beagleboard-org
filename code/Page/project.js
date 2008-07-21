this.numMaxProjectMembers = 10;

function ownername_macro (param)
 {
  return ("" + this.ownername);
 }

function homepage_macro (param)
 {
  return ("" + this.homepage);
 }

function shortdesc_macro (param)
 {
  return ("" + this.shortdesc);
 }

function desc_macro (param)
 {
  return ("" + this.desc);
 }
 
function htmlencode_macro (param)
 {
  return encode("" + eval(param.param));
 }


function edit_project_action ()
 {
  if (!session.user || !session.user["name"])
   {
    res.redirect(root.href("login") + "?target=" + this.href());
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


	function getUsersList()
	{
    var u = app.getRegisteredUsers();
		var thelist = "<option value=\"\">-- select a user --</option>";
    for (n in u)
     {
      t = u[n].name;
			thelist += "  <option value=\"" + t + "\">" + t + "</option>\n";
     }
	  return thelist;
	}

  this.errmsg = "";
  this.userslist = getUsersList();

  this.registrant = cleanField(this.registrant);
  this.uri = cleanField(this.uri);
  this.pname = cleanField(this.pname);
  this.shortdesc = cleanField(this.shortdesc);
  this.desc = cleanField(this.desc);
  this.homepage = cleanField(this.homepage);
  this.wiki = cleanField(this.wiki);
  this.mailinglist = cleanField(this.mailinglist);
  this.downloadlink = cleanField(this.downloadlink);
  this.rssfeed = cleanField(this.rssfeed);
  this.repository = cleanField(this.repository);
  this.repositoryurl = cleanField(this.repositoryurl);

  this.numMembers = 0;
  for (i = 1; i <= this.numMaxProjectMembers; i++) {
     eval("this.memberuserid"+i+" = cleanField(this.memberuserid"+i+")");
     eval("this.membername"+i+" = cleanField(this.membername"+i+")");
     eval("this.memberrole"+i+" = cleanField(this.memberrole"+i+")");
	 if (eval("this.memberuserid"+i) != "" || eval("this.membername"+i) != "") this.numMembers++;
  }

  if ("" + this.registrant == "") {
	  this.registrant = session.user["name"];
  }

  if
   (
    req.data["submit"]
   )
   {
		this.registrant = req.data["registrant"];
	  this.uri = req.data["uri"];
	  this.pname = req.data["pname"];
	  this.shortdesc = req.data["shortdesc"];
	  this.desc = req.data["desc"];
	  this.homepage = req.data["homepage"];
	  this.wiki = req.data["wiki"];
	  this.mailinglist = req.data["mailinglist"];
	  this.downloadlink = req.data["downloadlink"];
	  this.rssfeed = req.data["rssfeed"];
		this.repository = req.data["repository"];
	  this.repositoryurl = req.data["repositoryurl"];
		this.updatetime = new Date();
		
		nCurMember = 1;
		for (i = 1; i <= this.numMaxProjectMembers; i++) {
			if (eval("req.data[\"memberuserid"+i+"\"]") || eval("req.data[\"membername"+i+"\"]")) {
				eval("this.memberuserid"+nCurMember+" = req.data[\"memberuserid"+i+"\"]");
				eval("this.membername"+nCurMember+" = req.data[\"membername"+i+"\"]");
				eval("this.memberrole"+nCurMember+" = req.data[\"memberrole"+i+"\"]");
				nCurMember++;
			}
		}
		for (i = nCurMember; i <= this.numMaxProjectMembers; i++) {
			eval("this.memberuserid"+i+" = \"\"");
			eval("this.membername"+i+" = \"\"");
			eval("this.memberrole"+i+" = \"\"");
		}

    if 
     (
       req.data["registrant"] &&
       req.data["uri"] &&
       req.data["pname"] &&
       req.data["shortdesc"] &&
       req.data["desc"]
     )
     {
	    this.render_skin = "project";
	    this.edit_skin = "edit_project";
	    if (this.isTransient())
	     {
	      this.uri = req.data["uri"];
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
    else 
     {
       if (!req.data["desc"]) this.errmsg = "* Full Description is a required field";
       if (!req.data["shortdesc"]) this.errmsg = "* Short Description/Summary is a required field";
       if (!req.data["pname"]) this.errmsg = "* Project Name is a required field";
       if (!req.data["uri"]) this.errmsg = "* Project Shortname/URI is a required field";
       if (!req.data["registrant"]) this.errmsg = "* Registrant is a required field";
     }
   }
  res.data.title = this.uri + " - edit_project";
  if (this.edit_skin)
   res.data.body = this.renderSkinAsString(this.edit_skin);
  else
   res.data.body = this.renderSkinAsString("edit_project");
  renderSkin("index");
 }

function showProjectInfoTbl_macro (param)
 {
	var str = "";

    function fixUrl(param)
	{
		param = "" + param;
		if (param.search("http://") == -1 && param.search("https://") == -1) 
		  param = "http://" + param;
		return param;
	}

	if (""+this.homepage != "")
	   str +=  "<tr>\n" +
	           "  <td valign=\"top\" align=\"right\">Homepage</td>\n" +
			   "  <td><a href=\"" + fixUrl(this.homepage) + "\" target=\"_blank\">" + fixUrl(this.homepage) + "</a></td>"+
			   "</tr>";

	if (""+this.wiki != "")
	   str +=  "<tr>\n" +
	           "  <td valign=\"top\" align=\"right\">Wiki</td>\n" +
			   "  <td><a href=\"" + fixUrl(this.wiki) + "\" target=\"_blank\">" + fixUrl(this.wiki) + "</a></td>"+
			   "</tr>";

	if (""+this.mailinglist != "")
	   str +=  "<tr>\n" +
	           "  <td valign=\"top\" align=\"right\">Mailing List</td>\n" +
			   "  <td><a href=\"" + fixUrl(this.mailinglist) + "\" target=\"_blank\">" + fixUrl(this.mailinglist) + "</a></td>"+
			   "</tr>";

	if (""+this.downloadlink != "")
	   str +=  "<tr>\n" +
	           "  <td valign=\"top\" align=\"right\">Download Link</td>\n" +
			   "  <td><a href=\"" + fixUrl(this.downloadlink) + "\" target=\"_blank\">" + fixUrl(this.downloadlink) + "</a></td>"+
			   "</tr>";

	if (""+this.rssfeed != "")
	   str +=  "<tr>\n" +
	           "  <td valign=\"top\" align=\"right\">Rss Feed</td>\n" +
			   "  <td>" + this.rssfeed + "</td>"+
			   "</tr>";

	if (""+this.repositoryurl != "")
	   str +=  "<tr>\n" +
	           "  <td valign=\"top\" align=\"right\">" + (this.repository=='CVS'||this.repository=='Bitkeeper'||this.repository=='Subversion'?this.repository+" ":"") + "Repository</td>\n" +
			   "  <td>" + this.repositoryurl + "</td>"+
			   "</tr>";

	return str;
 }
 
 function showProjectMembers_macro (param)
 {
	var str = "";
	
	for (i=1;i<=this.numMaxProjectMembers;i++) {
		if (eval("this.memberuserid" + i) || eval("this.membername" + i)) {
			if (eval("this.membername" + i))
			  line = eval("this.membername" + i);
			else
			  line = eval("this.memberuserid" + i);
			  
			if (eval("this.memberuserid" + i))
			  line = "<a href='/user/" + eval("this.memberuserid" + i) + "'>" + line + "</a>"

			line = "  <li>" + line + " - " + eval("this.memberrole" + i) + "</li>\n";
			
			str += line;
		}
	}
	return "<ul>\n" + str + "</ul>"
 }
