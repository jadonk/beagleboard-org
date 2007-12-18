/**
 * Copyright (C) 2007 Jason Kridner
 *
 * @author Jason Kridner
 */

function feed_action ()
 {
  res.data.title = "Future home of BeagleComputer.Org"

  var feedURL = "http://beagleboard.blogspot.com/feeds/posts/default";

  res.data.body = "" + Xml.get(feedURL);

  //var tiSearchCleaner = new Packages.org.htmlcleaner.HtmlCleaner(tiSearchContent);
  //tiSearchCleaner.clean();
  //tiSearchXml = tiSearchCleaner.getXmlAsString();
  //res.data.body = tiSearchXml;

  res.handlers["User"] = User();
  renderSkin("index");
 }

