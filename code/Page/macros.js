function href_macro (param)
 {
  return (this.href());
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
  return ("" + this.user);
 }

function body_macro (param)
 {
  return ("" + this.body);
 }

function lang_macro (param)
 {
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

