/**
 * Copyright (C) 2007 Texas Instruments, Jason Kridner, and Alvin Akibar
 */

app.addRepository('modules/helma/Http.js');

function opensearch_action ()
 {
  res.handlers["User"] = User();

  if (!req.data["q"])
   {
    res.data.title = "Search multiple engines";
    res.data.body = "";
    renderSkin("opensearch");
    return;
   }

  res.data.title = "Search results for '" + req.data["q"] + "'";
  res.data.body = "";

  var httpTI = new helma.Http();
  var httpExt = new helma.Http();
  //httpExt.setProxy("wwwgate.ti.com:80");

  /**
   * Fetch the search engine descriptors
   */
  //var x = http.getUrl("http://twiki.dal.design.ti.com/twiki/bin/view/User/OpenSearch");

  /**
   * Some of the search results have links that are relative to the search site and
   * need to be cleaned up
   */
  function cleanLinks (x, url)
   {
    if (typeof(x) != "xml")
     {
      x = new XML();
      return (x);
     }
    function fixAttrib (y, attrib)
     {
      if (y.@[attrib] && !(("" + y.@[attrib]).match(/\:\/\//)))
       {
        if (("" + y.@[attrib]).match(/^\//))
         y.@[attrib] = url + y.@[attrib];
        else
         y.@[attrib] = url + "/" + y.@[attrib];
       }
      return (y);
     }
    function fixList (list)
     {
      for each (y in list)
       {
        y = fixAttrib(y, "href");
        y = fixAttrib(y, "src");
       }
     }
    var r = new Namespace("http://www.w3.org/1999/xhtml");
    fixList(x..r::a)
    fixList(x..a)
    fixList(x..r::img)
    fixList(x..img)
    return (x);
   }

  /**
   * Manually configure the search engines
   */
  var engines =
   [
    {
     enable: false,
     source: "Pligg",
     http: httpTI,
     pre: "http://aspc0021.hou.asp.ti.com/pligg/search.php?x=0&y=0&search=",
     post: "",
     url: "http://aspc0021.hou.asp.ti.com/pligg",
     result: function(n) 
      { 
       var r = new Namespace("http://www.w3.org/1999/xhtml");
       var x = this.xml..r::div.(@["class"]=="entry")[n];
       x = cleanLinks(x, "http://aspc0021.hou.asp.ti.com");
       if (("" + x) != "")
        {
         var y = new XML(<div xmlns="http://www.w3.org/1999/xhtml"></div>);
         y.r::div.r::a = x..r::div.(@["class"]=="info")..r::h4.r::a;
         y.r::div[1] = x..r::div.(@["class"]=="content");
         return(y);
        }
       return(x);
      }
    },
    {
     enable: false,
     source: "search.ti.com",
     http: httpTI,
     pre: "http://search.ti.com/query.html?col=europe&col=design&col=tijpint&col=us&qt=",
     post: "&charset=iso-8859-1",
     url: "http://search.ti.com",
     result: function(n) 
      { 
       var x = this.xml..div.(@["class"]=="results").table[n];
       x = cleanLinks(x, "http://search.ti.com");
       return(x);
      }
    },
    {
     enable: true,
     source: "Custom Google",
     http: httpExt,
     pre: "http://www.google.com/cse?cx=001071468846613058269%3A7xzczc-zl1a&q=",
     post: "&sa=Search&cof=FORID:1",
     url: "http://search.hangerhead.com",
     result: function(n) 
      {
       var x = this.xml..div.(@["class"]=="g")[n];
       x = cleanLinks(x, "http://www.google.com");
       return(x);
      }
    },
    {
     enable: true,
     source: "Google",
     http: httpExt,
     pre: "http://www.google.com/search?q=",
     post: "&ie=utf-8&oe=utf-8&aq=t",
     url: "http://www.google.com",
     result: function(n) 
      {
       var x = this.xml..div.(@["class"]=="g")[n];
       x = cleanLinks(x, "http://www.google.com");
       return(x);
      }
    },
    {
     enable: false,
     source: "E-mail List Archive",
     http: httpTI,
     pre: "http://listarchive.sanb.design.ti.com/search?q=",
     //post: "&flags=68&num=10&s=fM3oD_2tb-E16Qn4HjmdHIUCY0g",
     post: "",
     url: "http://listarchive.sanb.design.ti.com",
     result: function(n) 
      {
       var x = this.xml..body.table.(@["cellpadding"]=="0")[n];
       x = cleanLinks(x, "http://listarchive.sanb.design.ti.com");
       if ((typeof(x) == "xml") && ("" + x..font.b).match("Invalid"))
        {
         x = new XML();
        }
       return(x);
      }
    },
    {
     enable: false,
     source: "Wikipedia",
     http: httpExt,
     pre: "http://en.wikipedia.org/wiki/Special:Search?search=",
     post: "&fulltext=Search",
     url: "http://en.wikipedia.org",
     result: function(n) 
      { return("tbd"); }
    }
   ];

  /**
   * Call the search engines
   */
  for (var i=0; i<engines.length; i++)
   {
    var e = engines[i];
    if (e.enable)
     {
      var x = e.http.getUrl(e.pre + req.data["q"] + e.post);
      var cleaner = new Packages.org.htmlcleaner.HtmlCleaner("" + x.content);
      app.debug(x.content);
      cleaner.clean();
      try
       {
        var s = "" + cleaner.getXmlAsString();
        s = s.replace(/xmlns:xml\=\"xml\"/g, "");
        app.debug(s);
        e.xml = new XML(s);
       }
      catch (ex)
       {
        e.xml = new XML("<div>Exception: " + ex + "<br/></div>");
       }
     }
   }

  /**
   * Interleave results
   */
  for (n=0; n<5; n++)
   {
    for (var i=0; i<engines.length; i++)
     {
      var e = engines[i];
      if (e.enable)
       {
        var result = e.result(n);
        if (result && (result != ""))
         {
          res.data.body += '<div class="result">' + e.result(n);
          res.data.body += "<small>Source: <b>"
          res.data.body += '<a href="' + e.url + '">';
          res.data.body += e.source;
          res.data.body += '</a>';
          res.data.body += "</b></small></div><hr/>";
         }
       }
     }
   }

  renderSkin("opensearch");
 }

