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

function action_macro (param)
 {
  return ("" + this.href(param));
 }
