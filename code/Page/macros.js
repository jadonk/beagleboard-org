function href_macro (param)
 {
  return (this.href());
 }

function uri_macro (param)
 {
  if (req.data["uri"])
   return ("" + req.data["uri"]);
  else if (this.uri && this.uri != "new")
   return (this.uri);
  else
   return ("");
 }

function id_macro (param)
 {
  return ("" + this._id);
 }

function page_macro (param)
 {
  return ("" + this.page);
 }

function user_macro (param)
 {
  return (("" + this.user).replace(/\@.*$/, ""));
 }

function body_macro (param)
 {
  if (this.isTransient())
   return ("");
  var alt = req.data["use_alt"];
  if (alt && this.alt && this.alt[alt])
   return ("" + this.alt[alt].body);
  return ("" + this.body);
 }

function lang_macro (param)
 {
  if (this.isTransient())
   return ("en-us");
  var alt = req.data["use_alt"];
  if (alt && this.alt && this.alt[alt])
   return ("" + this.alt[alt].lang);
  return ("" + this.lang);
 }

function action_macro (param)
 {
  return ("" + this.href(param));
 }

function breadcrumb_macro (param)
 {
  var breadcrumbs = [];
  var obj = this;
  var promptString = "";
  do
   {
    var promptString = '<a href="' + obj.href + '">' + obj + '</a>' +
     promptString;
   } while (obj = obj._parent);
  return (promptString);
 }

function list_macro (param)
 {
  var alt = req.data["use_alt"];
  if (alt && this.alt && this.alt[alt])
   {
    if (this.list && this.alt[alt].list_children)
     return (this.listBody());
   }
  else if (this.list && this.list_children)
   return (this.listBody());
 }

function registrant_macro (param)
 {
  if (this.registrant)
   {
    return (("" + this.registrant).replace(/\@.*$/, ""));
   }
  else
   {
    return ("");
   }
 }

function registrar_macro (param)
 {
  if (this.registrant)
   {
    return (("" + this.registrant).replace(/\@.*$/, ""));
   }
  else if (session.user && session.user["name"])
   {
    return (("" + session.user["name"]).replace(/\@.*$/, ""));
   }
  else
   {
    return ("blog.hangerhead.com");
   }
 }

function alt_macro (param)
 {
  var alt = req.data["use_alt"];
  if (alt && this.alt && this.alt[alt])
   return ("" + alt);
  else
   return ("[default]");
 }
