--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: mello_user
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO mello_user;

--
-- Name: boards; Type: TABLE; Schema: public; Owner: mello_user
--

CREATE TABLE public.boards (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    board_name character varying(50) NOT NULL,
    board_image character varying(150) NOT NULL,
    public boolean,
    team boolean,
    "teamId" integer,
    list_order character varying(500),
    updated timestamp without time zone NOT NULL,
    created timestamp without time zone NOT NULL
);


ALTER TABLE public.boards OWNER TO mello_user;

--
-- Name: boards_id_seq; Type: SEQUENCE; Schema: public; Owner: mello_user
--

CREATE SEQUENCE public.boards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.boards_id_seq OWNER TO mello_user;

--
-- Name: boards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mello_user
--

ALTER SEQUENCE public.boards_id_seq OWNED BY public.boards.id;


--
-- Name: cards; Type: TABLE; Schema: public; Owner: mello_user
--

CREATE TABLE public.cards (
    id integer NOT NULL,
    title character varying(100) NOT NULL,
    "listId" integer NOT NULL,
    details character varying(500),
    color character varying(15),
    completed boolean,
    due_date timestamp without time zone,
    updated timestamp without time zone NOT NULL,
    created timestamp without time zone NOT NULL
);


ALTER TABLE public.cards OWNER TO mello_user;

--
-- Name: cards_id_seq; Type: SEQUENCE; Schema: public; Owner: mello_user
--

CREATE SEQUENCE public.cards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cards_id_seq OWNER TO mello_user;

--
-- Name: cards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mello_user
--

ALTER SEQUENCE public.cards_id_seq OWNED BY public.cards.id;


--
-- Name: checklists; Type: TABLE; Schema: public; Owner: mello_user
--

CREATE TABLE public.checklists (
    id integer NOT NULL,
    "cardId" integer NOT NULL,
    text character varying(250) NOT NULL,
    completed boolean,
    updated timestamp without time zone NOT NULL,
    created timestamp without time zone NOT NULL
);


ALTER TABLE public.checklists OWNER TO mello_user;

--
-- Name: checklists_id_seq; Type: SEQUENCE; Schema: public; Owner: mello_user
--

CREATE SEQUENCE public.checklists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.checklists_id_seq OWNER TO mello_user;

--
-- Name: checklists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mello_user
--

ALTER SEQUENCE public.checklists_id_seq OWNED BY public.checklists.id;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: mello_user
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "cardId" integer NOT NULL,
    text character varying(350) NOT NULL,
    udated timestamp without time zone NOT NULL,
    created timestamp without time zone NOT NULL
);


ALTER TABLE public.comments OWNER TO mello_user;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: mello_user
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO mello_user;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mello_user
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: lists; Type: TABLE; Schema: public; Owner: mello_user
--

CREATE TABLE public.lists (
    id integer NOT NULL,
    list_name character varying(50) NOT NULL,
    "boardId" integer NOT NULL,
    card_order character varying(500),
    due_date timestamp without time zone,
    updated timestamp without time zone NOT NULL,
    created timestamp without time zone NOT NULL
);


ALTER TABLE public.lists OWNER TO mello_user;

--
-- Name: lists_id_seq; Type: SEQUENCE; Schema: public; Owner: mello_user
--

CREATE SEQUENCE public.lists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lists_id_seq OWNER TO mello_user;

--
-- Name: lists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mello_user
--

ALTER SEQUENCE public.lists_id_seq OWNED BY public.lists.id;


--
-- Name: teams; Type: TABLE; Schema: public; Owner: mello_user
--

CREATE TABLE public.teams (
    id integer NOT NULL,
    team_name character varying(150) NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.teams OWNER TO mello_user;

--
-- Name: teams_id_seq; Type: SEQUENCE; Schema: public; Owner: mello_user
--

CREATE SEQUENCE public.teams_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teams_id_seq OWNER TO mello_user;

--
-- Name: teams_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mello_user
--

ALTER SEQUENCE public.teams_id_seq OWNED BY public.teams.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: mello_user
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    hashed_password character varying(100) NOT NULL,
    notification integer,
    music boolean,
    last_login timestamp without time zone NOT NULL,
    created timestamp without time zone NOT NULL
);


ALTER TABLE public.users OWNER TO mello_user;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: mello_user
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO mello_user;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mello_user
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: boards id; Type: DEFAULT; Schema: public; Owner: mello_user
--

ALTER TABLE ONLY public.boards ALTER COLUMN id SET DEFAULT nextval('public.boards_id_seq'::regclass);


--
-- Name: cards id; Type: DEFAULT; Schema: public; Owner: mello_user
--

ALTER TABLE ONLY public.cards ALTER COLUMN id SET DEFAULT nextval('public.cards_id_seq'::regclass);


--
-- Name: checklists id; Type: DEFAULT; Schema: public; Owner: mello_user
--

ALTER TABLE ONLY public.checklists ALTER COLUMN id SET DEFAULT nextval('public.checklists_id_seq'::regclass);


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: mello_user
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: lists id; Type: DEFAULT; Schema: public; Owner: mello_user
--

ALTER TABLE ONLY public.lists ALTER COLUMN id SET DEFAULT nextval('public.lists_id_seq'::regclass);


--
-- Name: teams id; Type: DEFAULT; Schema: public; Owner: mello_user
--

ALTER TABLE ONLY public.teams ALTER COLUMN id SET DEFAULT nextval('public.teams_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: mello_user
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: mello_user
--

COPY public.alembic_version (version_num) FROM stdin;
66e2f239aa30
\.


--
-- Data for Name: boards; Type: TABLE DATA; Schema: public; Owner: mello_user
--

COPY public.boards (id, "userId", board_name, board_image, public, team, "teamId", list_order, updated, created) FROM stdin;
1	1	Coding Project	https://mello-zen-images.s3.amazonaws.com/zen-4.jpg	f	f	\N	\N	2020-07-26 17:33:36.8446	2020-07-26 17:33:36.844608
2	1	Home Remodel	https://mello-zen-images.s3.amazonaws.com/zen-2.jpg	f	f	\N	\N	2020-07-26 17:33:36.844611	2020-07-26 17:33:36.844612
3	1	Work Project	https://mello-zen-images.s3.amazonaws.com/zen-3.jpg	f	t	1	\N	2020-07-26 17:33:36.844614	2020-07-26 17:33:36.844615
4	2	Coding Project	https://mello-zen-images.s3.amazonaws.com/zen-4.jpg	f	f	\N	\N	2020-07-26 17:33:36.844617	2020-07-26 17:33:36.844618
5	2	Home Remodel	https://mello-zen-images.s3.amazonaws.com/zen-2.jpg	f	f	\N	\N	2020-07-26 17:33:36.84462	2020-07-26 17:33:36.844621
6	2	Work Project	https://mello-zen-images.s3.amazonaws.com/zen-3.jpg	f	t	1	\N	2020-07-26 17:33:36.844623	2020-07-26 17:33:36.844624
\.


--
-- Data for Name: cards; Type: TABLE DATA; Schema: public; Owner: mello_user
--

COPY public.cards (id, title, "listId", details, color, completed, due_date, updated, created) FROM stdin;
\.


--
-- Data for Name: checklists; Type: TABLE DATA; Schema: public; Owner: mello_user
--

COPY public.checklists (id, "cardId", text, completed, updated, created) FROM stdin;
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: mello_user
--

COPY public.comments (id, "userId", "cardId", text, udated, created) FROM stdin;
\.


--
-- Data for Name: lists; Type: TABLE DATA; Schema: public; Owner: mello_user
--

COPY public.lists (id, list_name, "boardId", card_order, due_date, updated, created) FROM stdin;
\.


--
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: mello_user
--

COPY public.teams (id, team_name, user_id) FROM stdin;
1	Zen Works Inc	1
2	Zen Works Inc	2
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: mello_user
--

COPY public.users (id, name, email, hashed_password, notification, music, last_login, created) FROM stdin;
1	Demo User	demo@gmail.com	pbkdf2:sha256:150000$590JY6dn$dbacd456fa607d37a9377add91254fac0fb192eb5ba7e2e2012a21df53f1c1a8	5	t	2020-07-26 17:33:36.590564	2020-07-26 17:33:36.590573
2	Brad Simpson	bradsimpson@icloud.com	pbkdf2:sha256:150000$41jC006L$714a79d2e93979da8d98daba32499a01335db5225f56ca17a59ada6b7ac40209	5	t	2020-07-26 17:33:36.725767	2020-07-26 17:33:36.725772
\.


--
-- Name: boards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mello_user
--

SELECT pg_catalog.setval('public.boards_id_seq', 6, true);


--
-- Name: cards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mello_user
--

SELECT pg_catalog.setval('public.cards_id_seq', 1, false);


--
-- Name: checklists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mello_user
--

SELECT pg_catalog.setval('public.checklists_id_seq', 1, false);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mello_user
--

SELECT pg_catalog.setval('public.comments_id_seq', 1, false);


--
-- Name: lists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mello_user
--

SELECT pg_catalog.setval('public.lists_id_seq', 1, false);


--
-- Name: teams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mello_user
--

SELECT pg_catalog.setval('public.teams_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mello_user
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: mello_user
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: boards boards_pkey; Type: CONSTRAINT; Schema: public; Owner: mello_user
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT boards_pkey PRIMARY KEY (id);


--
-- Name: cards cards_pkey; Type: CONSTRAINT; Schema: public; Owner: mello_user
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_pkey PRIMARY KEY (id);


--
-- Name: checklists checklists_pkey; Type: CONSTRAINT; Schema: public; Owner: mello_user
--

ALTER TABLE ONLY public.checklists
    ADD CONSTRAINT checklists_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: mello_user
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: lists lists_pkey; Type: CONSTRAINT; Schema: public; Owner: mello_user
--

ALTER TABLE ONLY public.lists
    ADD CONSTRAINT lists_pkey PRIMARY KEY (id);


--
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: public; Owner: mello_user
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: mello_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: mello_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: boards boards_teamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mello_user
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT "boards_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public.teams(id);


--
-- Name: boards boards_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mello_user
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT "boards_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: cards cards_listId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mello_user
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT "cards_listId_fkey" FOREIGN KEY ("listId") REFERENCES public.lists(id);


--
-- Name: checklists checklists_cardId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mello_user
--

ALTER TABLE ONLY public.checklists
    ADD CONSTRAINT "checklists_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES public.cards(id);


--
-- Name: comments comments_cardId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mello_user
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES public.cards(id);


--
-- Name: comments comments_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mello_user
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: lists lists_boardId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mello_user
--

ALTER TABLE ONLY public.lists
    ADD CONSTRAINT "lists_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES public.boards(id);


--
-- Name: teams teams_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mello_user
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

