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
-- Name: person; Type: TABLE; Schema: public; Owner: helma; Tablespace: 
--

CREATE TABLE person (
    id integer DEFAULT 0 NOT NULL,
    firstname character varying(128) DEFAULT ''::character varying NOT NULL,
    lastname character varying(128) DEFAULT ''::character varying NOT NULL,
    email character varying(128) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE public.person OWNER TO helma;

--
-- Name: xmlpage; Type: TABLE; Schema: public; Owner: helma; Tablespace: 
--

CREATE TABLE xmlpage (
    id integer DEFAULT 0 NOT NULL,
    xml character varying(1024) DEFAULT ''::character varying NOT NULL,
    username character varying(64) DEFAULT ''::character varying NOT NULL,
    "time" date,
    edit integer
);


ALTER TABLE public.xmlpage OWNER TO helma;

--
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: helma
--

COPY person (id, firstname, lastname, email) FROM stdin;
1	Asdf	Jlk	asdf@jkl.com
0	Joex	Blowq	joex@blowqq.net
2	Firstname1	Lastname2	Somewhere@over.the.rainbow
3	Jacob	Jose	
\.


--
-- Data for Name: xmlpage; Type: TABLE DATA; Schema: public; Owner: helma
--

COPY xmlpage (id, xml, username, "time", edit) FROM stdin;
\.


--
-- Name: person_pkey; Type: CONSTRAINT; Schema: public; Owner: helma; Tablespace: 
--

ALTER TABLE ONLY person
    ADD CONSTRAINT person_pkey PRIMARY KEY (id);


ALTER INDEX public.person_pkey OWNER TO helma;

--
-- Name: xmlpage_pkey; Type: CONSTRAINT; Schema: public; Owner: helma; Tablespace: 
--

ALTER TABLE ONLY xmlpage
    ADD CONSTRAINT xmlpage_pkey PRIMARY KEY (id);


ALTER INDEX public.xmlpage_pkey OWNER TO helma;

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

