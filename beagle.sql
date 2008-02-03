--
-- PostgreSQL database dump
--

SET client_encoding = 'SQL_ASCII';
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'Standard public schema';


SET search_path = public, pg_catalog;

--
-- Name: plpgsql_call_handler(); Type: FUNCTION; Schema: public; Owner: helma
--

CREATE FUNCTION plpgsql_call_handler() RETURNS language_handler
    AS '$libdir/plpgsql', 'plpgsql_call_handler'
    LANGUAGE c;


ALTER FUNCTION public.plpgsql_call_handler() OWNER TO helma;

--
-- Name: plpgsql_validator(oid); Type: FUNCTION; Schema: public; Owner: helma
--

CREATE FUNCTION plpgsql_validator(oid) RETURNS void
    AS '$libdir/plpgsql', 'plpgsql_validator'
    LANGUAGE c;


ALTER FUNCTION public.plpgsql_validator(oid) OWNER TO helma;

--
-- Name: plpgsql; Type: PROCEDURAL LANGUAGE; Schema: public; Owner: 
--

CREATE TRUSTED PROCEDURAL LANGUAGE plpgsql HANDLER plpgsql_call_handler VALIDATOR plpgsql_validator;


SET default_tablespace = '';

SET default_with_oids = true;

--
-- Name: page; Type: TABLE; Schema: public; Owner: helma; Tablespace: 
--

CREATE TABLE page (
    id integer DEFAULT 0 NOT NULL,
    uri character varying(32) DEFAULT 'default'::character varying NOT NULL,
    body character varying(32768) DEFAULT ''::character varying NOT NULL,
    lang character varying(8) DEFAULT 'en-US'::character varying NOT NULL,
    username character varying(64) DEFAULT ''::character varying NOT NULL,
    createtime timestamp without time zone NOT NULL,
    prev integer
);


ALTER TABLE public.page OWNER TO helma;

--
-- Data for Name: page; Type: TABLE DATA; Schema: public; Owner: helma
--

COPY page (id, uri, body, lang, username, createtime, prev) FROM stdin;
10	brief	<h1>What is Beagle?</h1>\r\n<h2>Where did the Beagle Board idea come from?</h2>\r\n<p>Gerald, a hardware guy in strategic marketing supporting OMAP customers, asked me, and others, what could we do with a board based on the highest performance ARM-based system-on-chip available today, if it was small and powered via USB.  The answer was to create the most amazing open source development and education project yet seen in the embedded world.  At least, that is what it will be as soon as we learn to get out of the way of innovators and simply enable them to work together on the latest silicon technology.</p>\r\n<p>The first thing I did was ask Gerald about things we could add to the board.  What about an LCD?  What about on-board WiFi and Ethernet?  He said, sure, no problem $10 here, $30 there.  When I finally woke up and realized that with all the things we wanted to do with this board, the best thing to do was to enable them <u><b>all</b></u> by simply <i>getting out of the way</i>.</p>\r\n\r\n<h2>Doing more with less</h2>\r\n<p>By eliminating all of the on-board peripherals, beyond the numerous ones on the digital and analog system-on-chip pair themselves, and by providing standard expansion buses, like high-speed USB 2.0 and SDIO, developers are able to bring-their-own peripherals and do exactly what they want.  What we created was a <i>low-cost, fan-less <u>computer</u></i>, with all the expandability of today's desktop machines, but <i>without the bulk, expense, or noise</i>.  It is the kind of platform you can use to develop computer science solutions that could be put <i>anywhere</i>.</p>\r\n<p>Instead of using a fixed, embedded LCD, Gerald used the digital and analog LCD ports to add monitor/TV connections, so that any DVI-D enabled monitor or S-Video enabled TV could be used.  The USB type-A connector can be used to add a high-speed hub for adding a keyboard, mouse, and WiFi connection and the MMC/SD connector can be used to add multiple gigabytes of storage, but building a computer out of the Beagle Board is <i>just the beginning</i>.</p>\r\n<h2>Collaborating on the Beagle Board</h2>\r\n\r\n<p>With the simple theme of supporting standard interfaces and getting out of the way, those who would like to collaborate on extending the Beagle Board platform are encouraged to do it in any way they'd like.  Instead of trying to take control of the community by pushing a single collaboration portal, Beagle Board developers are encouraged to take their contributions directly to the communities already supporting the project they desire to port to the Beagle Board, or to create their own community collaboration tools using existing offerings at <a href="http://code.google.com">code.google.com</a>, <a href="http://sf.net">sf.net</a>, <a href="http://freedesktop.org">freedesktop.org</a>, and others.</p>\r\n<p>It is certainly true that by encouraging Beagle Board collaboration to spread to the corners of the Internet that there will be fragmentation in the community.  Developers will therefore be encouraged to do three things:\r\n<ul>\r\n<li>Register their project at <a href="http://beagleboard.org">BeagleBoard.org</a>,</li>\r\n<li>Provide information about their project using one of the <a href="http://creativecommons.org">Creative Commons</a> licenses, and</li>\r\n\r\n<li> Publish RSS/Atom feeds that can be used to update the project status reflected on <a href="http://beagleboard.org">BeagleBoard.org</a>.</li>\r\n</ul> \r\n</p>\r\n<p>The web software required to aggregate information about these projects, including their release announcements, bug reports, and discussion links, will all be built using widely adopted standards, such as RSS and Atom, as an open source project of its own that is executed on the BeagleBoard.org server.  Developers will be welcomed and encouraged to take the web server build script for Amazon EC2 servers and website source to improve upon the aggregation capabilities of the site.</p>\r\n<h2>What can the Beagle Board do?</h2>\r\n<p>I'm still trying to find applications where the Beagle Board can't play a role.  The general-purpose processor performance of the Beagle Board exceeds that of other low-cost computing platforms on the market today, such as the OLPC XO-1.  Additionally, the processor contains 2D and 3D graphics acceleration capabilities as well as  a DSP optimized for multimedia processing.  A typical configuration of a Beagle Board system would draw power off of a USB port on standard laptop or desktop PC used for developing and downloading the low-level Beagle Board software, but additional peripherals would allow the Beagle Board to operate as a multimedia computer on its own.</p>\r\n<h3>Possible applications</h3>\r\n<ul>\r\n<li>Low-cost Linux PC</li>\r\n\r\n<li>Network-connected digital signage</li>\r\n<li>3D user interface development</li>\r\n<li>Game console</li>\r\n<li>LCD-to-picture-frame conversion kit</li>\r\n<li>Adobe Flash client "alarm clock" (like the Chumby)</li>\r\n<li>Kitchen computer</li>\r\n<li>Web services development</li>\r\n<li>Google Talk video phone</li>\r\n<li>Notebook TV-out via USB</li>\r\n\r\n<li>Projector media reader and presenter<li>\r\n<li>Gaming platform emulator</li>\r\n<li>Thin client terminal</li>\r\n<li>Web browser for the TV</li>\r\n<li>Multimedia codec and framework development</li>\r\n<li>Home networked media (DLNA/XMPP) server/client</li>\r\n<li>Security camera analyzer, streamer, recorder, and monitor</li>\r\n<li>USB traffic monitor (looks like a HUB)</li>\r\n<li>USB class conversion (add software support where drivers aren't available on the PC)</li>\r\n\r\n<li>Network sniffer</li>\r\n<li>Set-top box</li>\r\n</ul> \r\n<h2>How do I get a Beagle Board of my own?</h2>\r\n<p>Once the hardware is available, links to where you can purchase a Beagle Board will always be available on <a href="http://beagleboard.org">BeagleBoard.org</a>.</p>\r\n<p>If you are more adventurous, then you are invited to utilize all of the Beagle Board design materials that will be provided as they have been tested.  This includes electronic copies of the schematic, layout, and assembly designs.  All of the Texas Instruments components utilized on the board will be made available for public purchase.  If there is a component that is difficult for you to purchase, please contact me for additional information.  Building boards isn't easy and you are encouraged to purchase the boards through the website, but links to manufacturers who can handle making these boards will be provided to those looking to extend the design.</p>\r\n<h2>For whom is the Beagle Board intended? / Using the Beagle Board for fun, education, and profit </h2>\r\n<p>We didn't put a case around the Beagle Board and turn it into a consumer product because that is what TI customers do.  Instead, the Beagle Board is intended for those wanting to learn about building embedded systems and don't need all of the support or costs associated with the typical development platform.  Once you are done experimenting and need a silicon evaluation platform that will help you make a product, platforms with software compatibility are available.</p>\r\n<p>--<a href="http://blog.hangerhead.com/">Jason Kridner</a></p>\r\n	en-US	blog.hangerhead.com	2008-02-02 22:04:30.325	\N
11	default	<h1>Future home of BeagleBoard.org</h1>\r\n<p>The Beagle Board is a <i>low-cost, fan-less computer</i> based on Texas Instruments' <a href="http://www.ti.com/omap">OMAP device family</a>, with all of the expandibility of today's desktop machines, but <i>without the bulk, expense, or noise</i>.  Today, participation is limited to a handful of\r\n open source developers and universities.  Once there is enough here to make the platform suitable for a broader group of developers, you'll be able to find purchasing information and the latest status at <a href="http://beagleboard.org">BeagleBoard.org</a>.  Feel free to subscribe to the <a href="http://www.beagleboard.org/rss">BeagleBoard RSS feed here</a> with your browser now.</p>\r\n<p>For now, project information is hosted on Google under the <a href="http://code.google.com/p/beagleboard">BeagleBoard Project</a>.  Source files for some projects will be hosted here locally on the\r\n <a href="http://www.beagleboard.org/gitweb">BeagleBoard GitWeb</a>.  This is only for source where SVN is not suitable for source management.</p>\r\n<p>Current participants are welcome to sign-up on the <a href="http://groups.google.com/group/beagleboard">Google-hosted BeagleBoard Discussion List</a>.  For a "live" discussion, please feel free to join us on the <a href="https://pibb.com/go/beagle">Pibb-hosted chat</a> or the <a href="irc://irc.freenode.net/#beagle">#beagle channel on irc.freenode.net</a>.</p>\r\n<p>--<a href="http://blog.hangerhead.com/">Jason Kridner</a></p>	en-US	blog.hangerhead.com	2008-02-02 22:06:08.758	\N
12	test	Simple test page.	en-US	blog.hangerhead.com	2008-02-02 22:07:59.108	\N
13	register	<h1>BeagleBoard.org registration page</h1>\r\n<p>One of the missions of BeagleBoard.org is to create a website where anyone can participate, including taking all of the source of the website to create their own.  If we were to maintain a long list of usernames and passwords on this site, there might be significant risk of someone using our open nature to hack into the site and steal that information.  Besides, it is simply a pain to have to remember a username and password for every new site where you want to contribute.  Still, we can't allow people to simply post whatever they want without maintaining some information about their identity.</p>\r\n<p>Fortunately, there is <a href="http://openid.net/">OpenID</a>.  Using OpenID, you can maintain one username and password across the many sites supporting the standard, without needing to provide them with your password information.</p>\r\n<p>If you don't already have an OpenID account or a preferred provider, go ahead and sign up at <a href="https://www.myopenid.com/signup">MyOpenID.com</a> and come back when you are done and visit the <a href="http://beagleboard.org/login">BeagleBoard.org login page</a> to find out the next steps.</p>	en-US	blog.hangerhead.com	2008-02-02 22:22:23.618	\N
14	register	<h1>BeagleBoard.org registration page</h1>\r\n<p>One of the missions of BeagleBoard.org is to create a website where anyone can participate, including taking all of the source of the website to create their own.  If we were to maintain a long list of usernames and passwords on this site, there might be significant risk of someone using our open nature to hack into the site and steal that information.  Besides, it is simply a pain to have to remember a username and password for every new site where you want to contribute.  Still, we can't allow people to simply post whatever they want without maintaining some information about their identity, so we need something.</p>\r\n<p>Fortunately, there is <a href="http://openid.net/">OpenID</a>.  Using OpenID, you can maintain one username and password across the many sites supporting the standard, without needing to provide them with your password information.</p>\r\n<p>If you don't already have an OpenID account or a preferred provider, go ahead and sign up at <a href="https://www.myopenid.com/signup">MyOpenID.com</a> and come back when you are done and visit the <a href="http://beagleboard.org/login">BeagleBoard.org login page</a> to find out the next steps.</p>	en-US	blog.hangerhead.com	2008-02-02 22:23:15.186	\N
16	login	<h1>BeagleBoard.org login page</h1>\r\n<p>Before you can edit any pages, you must <a href="/register">register</a> and login.  If the top, right-hand corner of the page shows text with your OpenID identity, then you are logged-in and you may have been brought to this page due to not having permissions to edit the page you were targeting.  If the top, right-hand corner of the page shows a box with the OpenID logo (<img src="/static/openid-prompt-bg.gif" />), then you must type your OpenID identity URL into this box and click the "Login" button to proceed.</p>	en-US	blog.hangerhead.com	2008-02-02 22:32:26.375	\N
15	login	<h1>BeagleBoard.org login page</h1>\r\n<p>Before you can edit any pages, you must <a href="/register">register</a> and login.  If the top, right-hand corner of the page shows text with your OpenID identity, then you are logged-in and you were brought to this page due to not having permissions to edit the page you were targeting.  If the top, right-hand corner of the page shows a box with the OpenID logo (<img src="/static/openid-prompt-bg.gif" />), then you must type your OpenID identity URL into this box and click the "Login" button to proceed.</p>	en-US	blog.hangerhead.com	2008-02-02 22:30:44.187	\N
\.


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO helma;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

