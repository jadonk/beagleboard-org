function project_macro (param)
 {
  var body = 
   "Project Name: " + this.uri + "<br>Project Owner:" + this.ownername
   + "<br>Summary: " + this.shortdesc
   + "<br>URL: <a href='" + this.homepage + ">" + this.homepage + "</a>"
   + "<br>" + "Submitted by:" + this.user + "<br>";
  return (body);
 }

