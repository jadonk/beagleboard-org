/* mflogbot: $Id: script.js 2 2005-12-29 23:25:34Z RobertBachmann $ */
var cookie_name='beagleirc';
var log_li;

function ReadCookie(name) 
{ // Soure: http://www.quirksmode.org/js/cookies.html
	var nameEQ = name + '=';
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function CreateCookie(name,value,days)
{ // Soure: http://www.quirksmode.org/js/cookies.html
	if (days)
	{
	var date = new Date();
	date.setTime(date.getTime()+(days*24*60*60*1000));
	var expires = '; expires='+date.toGMTString();
	}
	else var expires = '';
	document.cookie = name+'='+value+expires+'; path=/';
	
	// added a check if the cookie could be stored
	return ReadCookie(name);
}

function ShowCommand(show,cmd)
{
	var display=show ? 'block':'none';
	var pattern=new RegExp('\\b' + cmd + '\\b'); 
	
	for (var i=0; i < log_li.length; i++) {
		if (log_li[i].className.match(pattern)) 
			log_li[i].style.display=display;
	}

	return show;
}

function ShowUser(show,user)
{
	var display=show ? 'block':'none';

	for (var i=0;i<log_li.length;i++) {
		var c=log_li[i].getElementsByTagName('cite')[0];
		if (c && c.firstChild.nodeValue == user)
			log_li[i].style.display=display;
	}

	return show;
}

function CheckboxClick()
{
	if (this.id == 'join')
		ShowCommand(this.checked,'join');
	else if (this.id == 'quit')
		ShowCommand(this.checked,'(quit|part)');
	else if (this.id == 'mode')
		ShowCommand(this.checked,'mode');
	else if (this.id == 'show_jibot')
		ShowUser(this.checked,'jibot');
	else if (this.id == 'show_mfbot')
		ShowUser(this.checked,'mfbot');

	document.getElementById('SaveSettings').style.display='inline';
}

function SaveSettings()
{
	var s='';
	s+=document.getElementById('join').checked?'1':'0';
	s+=document.getElementById('quit').checked?'1':'0';
	s+=document.getElementById('mode').checked?'1':'0';
	s+=document.getElementById('show_jibot').checked?'1':'0';
	s+=document.getElementById('show_mfbot').checked?'1':'0';
	if (!CreateCookie(cookie_name,s,356))
		alert('Please enable "cookies" in your browser settings in order to store your settings.');
	document.getElementById('SaveSettings').style.display='none';
}

/* Fragment Highlight version 0.1 */

//*** This JavaScript highlight code is copyright 2003 by David Dorward; http://dorward.me.uk
//*** Re-use or modification permitted provided the previous line is included and
//*** modifications are indicated

/*********** Start of JavaScript Library *********/

//*** This JavaScript library is copyright 2002 by Gavin Kistner and Refinery; www.refinery.com
//*** Re-use or modification permitted provided the previous line is included

//Adds a new class to an object, preserving existing classes
function AddClass(obj,cName){ KillClass(obj,cName); return obj.className+=(obj.className.length>0?' ':'')+cName; }

//Removes a particular class from an object, preserving other existing classes.
function KillClass(obj,cName){ return obj.className=obj.className.replace(new RegExp("^"+cName+"\\b\\s*|\\s*\\b"+cName+"\\b",'g'),''); }

/*********** End of JavaScript Library ***********/

/* Fragment Highlight */

/* Indicates area that has been linked to if fragment identifiers have
 * been used. Especially useful in situations where a short fragment
 * is near the end of a page. */

var fragHLed = '';
var fragExclude = ('header');

Array.prototype.search = function(myVariable) { for(x in this) if(x == myVariable) return true; return false; }

/* Highlight link target if the visitor arrives at the page with a # */

function fragHLload() {
    fragHL(location.hash.substring(1));
}

/* Highlight link target from an onclick event after unhighlighting the old one */

function fragHL(frag) {
    if (fragHLed.length > 0 && document.getElementById(fragHLed)) {
KillClass(document.getElementById(fragHLed),'fragment');
    }
    if (frag.length > 0 && document.getElementById(frag)) {
fragHLed = frag;
AddClass (document.getElementById(frag),'fragment');
    }
}

/* Add onclick events to all <a> with hrefs that include a "#"  */

function fragHLlink() {
    if (document.getElementsByTagName) {
var an = document.getElementsByTagName('a');
for (i=0; i<an.length; i++) {
    if (an.item(i).getAttribute('href').indexOf('#') >= 0) {
var fragment = an.item(i).getAttribute('href').substring(an.item(i).getAttribute('href').indexOf('#') + 1);
if (fragment.match(/^^T[0123456789]{6}$/)){
if (fragExclude.search(fragment)) {
    var evn = "fragHL('" + fragment + "')";
    var fun = new Function('e',evn);
    an.item(i).onclick = fun;
}
    }} 
}
    }
} 

/* Init the script */

//window.onload = function(){
//    fragHLload();
//    fragHLlink();
//};

// End of "Fragment Highlight version 0.1"

window.onload=function() {
	if (!document.getElementById || !document.createElement) return;
	var log = document.getElementById('log');

	if (log) {
		log_li=log.getElementsByTagName('li');
		document.getElementById('log').getElementsByTagName('li');
		
		var f=document.createElement('form');
		var st=document.createElement('strong');
		var st_tn=document.createTextNode('Show: ');
		st.appendChild(st_tn);
		f.id='dynamic'; f.appendChild(st);

		var s1=document.createElement('span');
		var c1=document.createElement('input');
		var t1=document.createTextNode(" JOIN's ");
		c1.id = 'join'; c1.type = 'checkbox';
		c1.checked = c1.defaultChecked = true;
		c1.title=s1.title='Show/hide when somebody joins the channel';
		c1.onclick=CheckboxClick;
		s1.appendChild(c1); s1.appendChild(t1); f.appendChild(s1);

		var s2=document.createElement('span');
		var c2=document.createElement('input');
		var t2=document.createTextNode(" QUIT's/PART's ");
		c2.id = 'quit'; c2.type = 'checkbox';
		c2.checked = c2.defaultChecked=true;
		c2.title = s2.title = 'Show/hide when somebody leaves the channel';
		c2.onclick=CheckboxClick;
		s2.appendChild(c2); s2.appendChild(t2); f.appendChild(s2);

		var s3=document.createElement('span');
		var c3=document.createElement('input');
		var t3=document.createTextNode(" MODE's ");
		c3.id = 'mode'; c3.type = 'checkbox';
		c3.checked = c3.defaultChecked = true;
		c3.title = s3.title = 'Show/hide when somebody uses /MODE';
		c3.onclick = CheckboxClick;
		s3.appendChild(c3); s3.appendChild(t3); f.appendChild(s3);

		var s4=document.createElement('span');
		var c4=document.createElement('input');
		var t4=document.createTextNode(' jibot ');
		c4.id = 'show_jibot'; c4.type = 'checkbox';
		c4.checked = c4.defaultChecked = true;
		c4.title = s4.title = 'Show/hide messages by jibot';
		c4.onclick=CheckboxClick;
		s4.appendChild(c4); s4.appendChild(t4); f.appendChild(s4);

		var s5=document.createElement('span');
		var c5=document.createElement('input');
		var t5=document.createTextNode(' mfbot ');
		c5.id = 'show_mfbot'; c5.type = 'checkbox';
		c5.checked = c5.defaultChecked = true;
		c5.title = s5.title = 'Show/hide messages by mfbot';
		c5.onclick = CheckboxClick;
		s5.appendChild(c5); s5.appendChild(t5); f.appendChild(s5);

		var b=document.createElement('input');
		b.id='SaveSettings'; b.type='button';
		b.title='Save your settings into a "cookie"';
		b.value='Remember settings'
		b.onclick=SaveSettings;
		b.style.display='none';
		f.appendChild(b);

		log.parentNode.insertBefore(f,log);
		
		var ck=ReadCookie(cookie_name);
		if (ck) {
				document.getElementById('join').checked=ShowCommand(ck.charAt(0)=='1','join');
				document.getElementById('quit').checked=ShowCommand(ck.charAt(1)=='1','(quit|part)');
				document.getElementById('mode').checked=ShowCommand(ck.charAt(2)=='1','mode');
				document.getElementById('show_jibot').checked=ShowUser(ck.charAt(3)=='1','jibot');
				document.getElementById('show_mfbot').checked=ShowUser(ck.charAt(4)=='1','mfbot');
		}
	}
    fragHLload();fragHLlink();
}
