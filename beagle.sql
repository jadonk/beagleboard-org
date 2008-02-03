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
8	default	<h1>Future home of BeagleBoard.Org</h1>\r\n<p>The Beagle Board is a <i>low-cost, fan-less computer</i> based on Texas Instruments' <a href="http://www.ti.com/omap">OMAP device family</a>, with all of the expandibility of today's desktop machines, but <i>without the bulk, expense, or noise</i>.  Today, participation is limited to a handful of\r\n open source developers and universities.  Once there is enough here to make the platform suitable for a broader group of developers, you'll be able to find purchasing information and the latest status at <a href="http://beagleboard.org">BeagleBoard.org</a>.  Feel free to subscribe to the <a href="http://www.beagleboard.org/rss">BeagleBoard RSS feed here</a> with your browser now.</p>\r\n<p>For now, project information is hosted on Google under the <a href="http://code.google.com/p/beagleboard">BeagleBoard Project</a>.  Source files for some projects will be hosted here locally on the\r\n <a href="http://www.beagleboard.org/gitweb">BeagleBoard GitWeb</a>.  This is only for source where SVN is not suitable for source management.</p>\r\n<p>Current participants are welcome to sign-up on the <a href="http://groups.google.com/group/beagleboard">Google-hosted BeagleBoard Discussion List</a>.  For a "live" discussion, please feel free to join us on the <a href="https://pibb.com/go/beagle">Pibb-hosted chat</a> or the <a href="irc://irc.freenode.net/#beagle">#beagle channel on irc.freenode.net</a>.</p>\r\n<p>--<a href="http://blog.hangerhead.com/">Jason Kridner</a></p>	en-US	blog.hangerhead.com	2008-02-02 21:58:37.741	\N
9	default	<p>The Beagle Board is a <i>low-cost, fan-less computer</i> based on Texas Instruments' <a href="http://www.ti.com/omap">OMAP device family</a>, with all of the expandibility of today's desktop machines, but <i>without the bulk, expense, or noise</i>.  Today, participation is limited to a handful of\r\n open source developers and universities.  Once there is enough here to make the platform suitable for a broader group of developers, you'll be able to find purchasing information and the latest status at <a href="http://beagleboard.org">BeagleBoard.org</a>.  Feel free to subscribe to the <a href="http://www.beagleboard.org/rss">BeagleBoard RSS feed here</a> with your browser now.</p>\r\n<p>For now, project information is hosted on Google under the <a href="http://code.google.com/p/beagleboard">BeagleBoard Project</a>.  Source files for some projects will be hosted here locally on the\r\n <a href="http://www.beagleboard.org/gitweb">BeagleBoard GitWeb</a>.  This is only for source where SVN is not suitable for source management.</p>\r\n<p>Current participants are welcome to sign-up on the <a href="http://groups.google.com/group/beagleboard">Google-hosted BeagleBoard Discussion List</a>.  For a "live" discussion, please feel free to join us on the <a href="https://pibb.com/go/beagle">Pibb-hosted chat</a> or the <a href="irc://irc.freenode.net/#beagle">#beagle channel on irc.freenode.net</a>.</p>\r\n<p>--<a href="http://blog.hangerhead.com/">Jason Kridner</a></p>	en-US	blog.hangerhead.com	2008-02-02 21:59:17.819	\N
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

