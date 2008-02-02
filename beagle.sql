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
-- Name: PAGE; Type: TABLE; Schema: public; Owner: helma; Tablespace: 
--

CREATE TABLE PAGE (
    ID integer DEFAULT 0 NOT NULL,
    PAGE character varying(32) DEFAULT 'default'::character varying NOT NULL,
    BODY character varying(1024) DEFAULT ''::character varying NOT NULL,
    LANG character varying(8) DEFAULT 'en-US'::character varying NOT NULL,
    "USER" character varying(64) DEFAULT ''::character varying NOT NULL,
    "TIME" date NOT NULL,
    PREV integer DEFAULT NULL
);


ALTER TABLE public.PAGE OWNER TO helma;

--
-- Data for Name: PAGE; Type: TABLE DATA; Schema: public; Owner: helma
--

COPY PAGE (ID, PAGE, BODY, LANG, "USER", "TIME", PREV) FROM stdin;
\.


--
-- Name: PAGE_pkey; Type: CONSTRAINT; Schema: public; Owner: helma; Tablespace: 
--

ALTER TABLE ONLY PAGE
    ADD CONSTRAINT PAGE_pkey PRIMARY KEY (id);


ALTER INDEX public.PAGE_pkey OWNER TO helma;

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

