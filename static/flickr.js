zg_insert_badge = function()
 {
  var zg_bg_color = 'FFFFFF';
  var zgi_url = 'http://www.flickr.com/apps/badge/badge_iframe.gne?zg_bg_color='
   + zg_bg_color
   + '&zg_context=in%2Fpool-beagleboard%2F&zg_group_id=705532%40N22';
  document.write
   (
    '<iframe '
    + 'style="background-color:#' + zg_bg_color + ";"
    + ' border-color:#' + zg_bg_color + ';'
    + ' border:none;" width="113" height="151" frameborder="0" scrolling="no" src="'
    + zgi_url
    + '" title="Flickr Badge">'
    + '</iframe>'
   );
  if (document.getElementById)
   {
    document.write
     (
      '<div id="zg_whatlink">'
      + '<a href="http://www.flickr.com/badge.gne"'
      + ' style="color:#FF9900;"'
      + ' onclick="zg_toggleWhat(); return false;">'
      + 'What is this?'
      + '</a></div>'
     );
    }
   zg_toggleWhat = function()
    {
     document.getElementById('zg_whatdiv').style.display = 
      (document.getElementById('zg_whatdiv').style.display != 'none') ? 'none' : 'block';
     document.getElementById('zg_whatlink').style.display =
      (document.getElementById('zg_whatdiv').style.display != 'none') ? 'none' : 'block';
     return false;
    }
 }
