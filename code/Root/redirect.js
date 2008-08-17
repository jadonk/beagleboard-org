function redirect_action ()
 {
  root.renderSkin("redirect");
 }

function parameters_macro (param)
 {
  var str = "";
  var parameterMap = session.data["parameterMap"];
  var keys = parameterMap.keySet().toArray();
  for (var x in keys)
   {
    str += '\n   <input type="hidden" name="';
    str += "" + keys[x];
    str += '" value="';
    str += parameterMap.get(keys[x]);
    str += '"/>';
   }
  return (str);
 }
