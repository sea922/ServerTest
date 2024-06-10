--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

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

--
-- Name: game_server; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA game_server;


ALTER SCHEMA game_server OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: game_server; Owner: postgres
--

CREATE TABLE game_server."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE game_server."SequelizeMeta" OWNER TO postgres;

--
-- Name: tbl_item; Type: TABLE; Schema: game_server; Owner: postgres
--

CREATE TABLE game_server.tbl_item (
    id bigint NOT NULL,
    name character varying(128) NOT NULL,
    description character varying(255) NOT NULL,
    type character varying(64) NOT NULL,
    metadata json,
    "buyPrice" integer NOT NULL,
    "sellPrice" integer NOT NULL,
    deleted boolean DEFAULT false,
    "createdBy" bigint,
    "updatedBy" bigint,
    "deletedBy" bigint,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE game_server.tbl_item OWNER TO postgres;

--
-- Name: tbl_item_id_seq; Type: SEQUENCE; Schema: game_server; Owner: postgres
--

CREATE SEQUENCE game_server.tbl_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE game_server.tbl_item_id_seq OWNER TO postgres;

--
-- Name: tbl_item_id_seq; Type: SEQUENCE OWNED BY; Schema: game_server; Owner: postgres
--

ALTER SEQUENCE game_server.tbl_item_id_seq OWNED BY game_server.tbl_item.id;


--
-- Name: tbl_player; Type: TABLE; Schema: game_server; Owner: postgres
--

CREATE TABLE game_server.tbl_player (
    id bigint NOT NULL,
    username character varying(64) NOT NULL,
    password character varying(128) NOT NULL,
    email character varying(64) NOT NULL,
    "displayName" character varying(64) NOT NULL,
    type smallint DEFAULT 2,
    coin integer DEFAULT 1000,
    capacity integer DEFAULT 100,
    activated boolean DEFAULT false,
    deleted boolean DEFAULT false,
    "createdBy" bigint,
    "updatedBy" bigint,
    "deletedBy" bigint,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE game_server.tbl_player OWNER TO postgres;

--
-- Name: COLUMN tbl_player.type; Type: COMMENT; Schema: game_server; Owner: postgres
--

COMMENT ON COLUMN game_server.tbl_player.type IS '{"ANONYMOUS":1,"END_USER":2,"MANAGER":3,"ADMINISTRATOR":4,"SUPER_ADMIN":5}';


--
-- Name: tbl_player_id_seq; Type: SEQUENCE; Schema: game_server; Owner: postgres
--

CREATE SEQUENCE game_server.tbl_player_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE game_server.tbl_player_id_seq OWNER TO postgres;

--
-- Name: tbl_player_id_seq; Type: SEQUENCE OWNED BY; Schema: game_server; Owner: postgres
--

ALTER SEQUENCE game_server.tbl_player_id_seq OWNED BY game_server.tbl_player.id;


--
-- Name: tbl_player_inventory; Type: TABLE; Schema: game_server; Owner: postgres
--

CREATE TABLE game_server.tbl_player_inventory (
    id bigint NOT NULL,
    "playerId" bigint NOT NULL,
    "itemId" bigint NOT NULL,
    quantity integer NOT NULL,
    "sellPrice" integer NOT NULL,
    "createdBy" bigint,
    "updatedBy" bigint,
    "deletedBy" bigint,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE game_server.tbl_player_inventory OWNER TO postgres;

--
-- Name: tbl_player_inventory_id_seq; Type: SEQUENCE; Schema: game_server; Owner: postgres
--

CREATE SEQUENCE game_server.tbl_player_inventory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE game_server.tbl_player_inventory_id_seq OWNER TO postgres;

--
-- Name: tbl_player_inventory_id_seq; Type: SEQUENCE OWNED BY; Schema: game_server; Owner: postgres
--

ALTER SEQUENCE game_server.tbl_player_inventory_id_seq OWNED BY game_server.tbl_player_inventory.id;


--
-- Name: tbl_transactions_history; Type: TABLE; Schema: game_server; Owner: postgres
--

CREATE TABLE game_server.tbl_transactions_history (
    id bigint NOT NULL,
    "playerId" bigint NOT NULL,
    "itemId" bigint NOT NULL,
    type character varying(10) NOT NULL,
    "quantityChange" integer NOT NULL,
    "totalAmountChange" integer NOT NULL,
    "previousQuantity" integer NOT NULL,
    "currentQuantity" integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE game_server.tbl_transactions_history OWNER TO postgres;

--
-- Name: tbl_transactions_history_id_seq; Type: SEQUENCE; Schema: game_server; Owner: postgres
--

CREATE SEQUENCE game_server.tbl_transactions_history_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE game_server.tbl_transactions_history_id_seq OWNER TO postgres;

--
-- Name: tbl_transactions_history_id_seq; Type: SEQUENCE OWNED BY; Schema: game_server; Owner: postgres
--

ALTER SEQUENCE game_server.tbl_transactions_history_id_seq OWNED BY game_server.tbl_transactions_history.id;


--
-- Name: tbl_player; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_player (
    id bigint NOT NULL,
    username character varying(64) NOT NULL,
    password character varying(128) NOT NULL,
    email character varying(64) NOT NULL,
    "displayName" character varying(64) NOT NULL,
    type smallint DEFAULT 2,
    activated boolean DEFAULT false,
    deleted boolean DEFAULT false,
    "createdBy" bigint,
    "updatedBy" bigint,
    "deletedBy" bigint,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public.tbl_player OWNER TO postgres;

--
-- Name: COLUMN tbl_player.type; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.tbl_player.type IS '{"ANONYMOUS":1,"END_USER":2,"MECHANICAL":3,"ADMINISTRATOR":4,"SUPER_ADMIN":5}';


--
-- Name: tbl_player_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tbl_player_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tbl_player_id_seq OWNER TO postgres;

--
-- Name: tbl_player_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tbl_player_id_seq OWNED BY public.tbl_player.id;


--
-- Name: tbl_item id; Type: DEFAULT; Schema: game_server; Owner: postgres
--

ALTER TABLE ONLY game_server.tbl_item ALTER COLUMN id SET DEFAULT nextval('game_server.tbl_item_id_seq'::regclass);


--
-- Name: tbl_player id; Type: DEFAULT; Schema: game_server; Owner: postgres
--

ALTER TABLE ONLY game_server.tbl_player ALTER COLUMN id SET DEFAULT nextval('game_server.tbl_player_id_seq'::regclass);


--
-- Name: tbl_player_inventory id; Type: DEFAULT; Schema: game_server; Owner: postgres
--

ALTER TABLE ONLY game_server.tbl_player_inventory ALTER COLUMN id SET DEFAULT nextval('game_server.tbl_player_inventory_id_seq'::regclass);


--
-- Name: tbl_transactions_history id; Type: DEFAULT; Schema: game_server; Owner: postgres
--

ALTER TABLE ONLY game_server.tbl_transactions_history ALTER COLUMN id SET DEFAULT nextval('game_server.tbl_transactions_history_id_seq'::regclass);


--
-- Name: tbl_player id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_player ALTER COLUMN id SET DEFAULT nextval('public.tbl_player_id_seq'::regclass);


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: game_server; Owner: postgres
--

COPY game_server."SequelizeMeta" (name) FROM stdin;
20240306104645-create-item-table.js
20240306104645-create-palyer-table.js
20240306104645-create-palyerInventory-table.js
20240306104645-create-transactions-table copy.js
\.


--
-- Data for Name: tbl_item; Type: TABLE DATA; Schema: game_server; Owner: postgres
--

COPY game_server.tbl_item (id, name, description, type, metadata, "buyPrice", "sellPrice", deleted, "createdBy", "updatedBy", "deletedBy", "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	Sword	A sharp blade for combat.	Weapon	{"material":"Steel","weight":"5kg","damage":"20","durability":"100"}	100	4	f	\N	\N	\N	2024-06-10 11:55:16.355+00	2024-06-10 11:55:16.355+00	\N
2	Health Potion	Restores health over time.	Potion	{"effect":"Heal 50 HP","duration":"30 seconds","color":"Red"}	50	4	f	\N	\N	\N	2024-06-10 11:55:16.355+00	2024-06-10 11:55:16.355+00	\N
3	Magic Wand	Casts powerful spells.	Weapon	{"spell":"Fireball","range":"Medium","damage":"30"}	200	4	f	\N	\N	\N	2024-06-10 11:55:16.355+00	2024-06-10 11:55:16.355+00	\N
4	Shield	Protects against attacks.	Armor	{"material":"Iron","weight":"8kg","defense":"40","durability":"90"}	150	4	f	\N	\N	\N	2024-06-10 11:55:16.355+00	2024-06-10 11:55:16.355+00	\N
5	Bow	Long-range weapon.	Weapon	{"material":"Wood","arrowType":"Steel-tipped","range":"Long"}	300	4	f	\N	\N	\N	2024-06-10 11:55:16.355+00	2024-06-10 11:55:16.355+00	\N
6	Arrow	Ammunition for bows.	Ammunition	{"material":"Wood","length":"30cm","tip":"Steel"}	80	4	f	\N	\N	\N	2024-06-10 11:55:16.355+00	2024-06-10 11:55:16.355+00	\N
7	Helmet	Protects the head.	Armor	{"material":"Steel","weight":"3kg","defense":"20","durability":"95"}	120	4	f	\N	\N	\N	2024-06-10 11:55:16.355+00	2024-06-10 11:55:16.355+00	\N
8	Boots	Increases movement speed.	Armor	{"material":"Leather","weight":"1.5kg","speedBoost":"10"}	250	4	f	\N	\N	\N	2024-06-10 11:55:16.355+00	2024-06-10 11:55:16.355+00	\N
9	Ring of Strength	Increases physical strength.	Accessory	{"effect":"Strength +10","slot":"Ring"}	180	4	f	\N	\N	\N	2024-06-10 11:55:16.355+00	2024-06-10 11:55:16.355+00	\N
10	Amulet of Protection	Reduces damage taken.	Accessory	{"effect":"Damage Reduction 20","slot":"Amulet"}	220	4	f	\N	\N	\N	2024-06-10 11:55:16.355+00	2024-06-10 11:55:16.355+00	\N
11	Mana Potion	Restores mana.	Potion	{"effect":"Restore 50 MP","duration":"30 seconds","color":"Blue"}	220	4	f	\N	\N	\N	2024-06-10 11:55:16.355+00	2024-06-10 11:55:16.355+00	\N
12	Fire Scroll	Casts a fire spell.	Scroll	{"spell":"Fireball","power":"High","range":"Medium"}	220	4	f	\N	\N	\N	2024-06-10 11:55:16.355+00	2024-06-10 11:55:16.355+00	\N
13	Ice Scroll	Casts an ice spell.	Scroll	{"spell":"Ice Shard","power":"Medium","range":"Short"}	220	4	f	\N	\N	\N	2024-06-10 11:55:16.355+00	2024-06-10 11:55:16.355+00	\N
14	Teleport Scroll	Teleports the user to a specified location.	Scroll	{"destination":"Town Square","range":"Long"}	220	4	f	\N	\N	\N	2024-06-10 11:55:16.355+00	2024-06-10 11:55:16.355+00	\N
15	Invisibility Cloak	Makes the user invisible for a short duration.	Armor	{"duration":"60 seconds","rechargeTime":"5 minutes"}	220	4	f	\N	\N	\N	2024-06-10 11:55:16.355+00	2024-06-10 11:55:16.355+00	\N
16	Health Potion	Restores health over time.	Potion	{"effect":"Heal 50 HP","duration":"30 seconds","color":"Red"}	1000	100	t	2	2	\N	2024-06-10 12:10:22.401+00	2024-06-10 12:10:37.236+00	\N
\.


--
-- Data for Name: tbl_player; Type: TABLE DATA; Schema: game_server; Owner: postgres
--

COPY game_server.tbl_player (id, username, password, email, "displayName", type, coin, capacity, activated, deleted, "createdBy", "updatedBy", "deletedBy", "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	admin	$2a$10$sySxIBQzVSCn8DH4wtYKZ.Kzicz/7MQJjPV2gehI.wMrM3E8/lnNy	admin@gmail.com	Admin	5	10000	100	t	f	\N	\N	\N	\N	\N	\N
3	player2	$2a$10$l7pe8gBf2PriWjP.XBixHOgX51T2PF0tbBhS/AvjO3Aymr6c817Yy	player2@gmail.com	player2	2	10000	100	t	f	\N	\N	\N	\N	\N	\N
4	player3	$2a$10$yDDVC5fBMdzZeJfj3STryuRDyNZn9xWbtJ6Qa5q2Asij5.b5Ffld2	player3@gmail.com	player3	2	10000	100	t	f	\N	\N	\N	\N	\N	\N
5	player4	$2a$10$mfg0I584VU25CvuhNfZhaOQMlUvjgK7CH6.8p7Zs1XOpTpo5nY90K	player4@gmail.com	player4	2	10000	100	t	f	\N	\N	\N	\N	\N	\N
6	player5	$2a$10$Kbs9Zv82QksQ3ccXsTGHG.4M1CF3PWg0RrAhgKt.6vyS8jJdCuxmW	player5@gmail.com	Mechanical	2	10000	100	t	f	\N	\N	\N	\N	\N	\N
2	player1	$2a$10$yUSr9FrjLPbezW9KTP5nL.q64IIwQez1d9grJoZsg/4km.zkQAv1S	player1@gmail.com	Mechanical	2	5844	87	t	f	\N	\N	\N	\N	2024-06-10 12:11:42.494+00	\N
\.


--
-- Data for Name: tbl_player_inventory; Type: TABLE DATA; Schema: game_server; Owner: postgres
--

COPY game_server.tbl_player_inventory (id, "playerId", "itemId", quantity, "sellPrice", "createdBy", "updatedBy", "deletedBy", "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	2	1	5	100	2	2	\N	2024-06-10 11:55:16.364+00	2024-06-10 11:55:16.364+00	\N
2	3	2	3	50	2	2	\N	2024-06-10 11:55:16.364+00	2024-06-10 11:55:16.364+00	\N
3	2	3	2	200	3	3	\N	2024-06-10 11:55:16.364+00	2024-06-10 11:55:16.364+00	\N
4	3	4	1	150	2	2	\N	2024-06-10 11:55:16.364+00	2024-06-10 11:55:16.364+00	\N
5	4	5	4	300	3	3	\N	2024-06-10 11:55:16.364+00	2024-06-10 11:55:16.364+00	\N
6	2	6	7	80	2	2	\N	2024-06-10 11:55:16.364+00	2024-06-10 11:55:16.364+00	\N
7	3	7	6	120	2	2	\N	2024-06-10 11:55:16.364+00	2024-06-10 11:55:16.364+00	\N
8	4	8	3	250	3	3	\N	2024-06-10 11:55:16.364+00	2024-06-10 11:55:16.364+00	\N
9	2	9	8	180	2	2	\N	2024-06-10 11:55:16.364+00	2024-06-10 11:55:16.364+00	\N
10	3	10	2	220	2	2	\N	2024-06-10 11:55:16.364+00	2024-06-10 11:55:16.364+00	\N
16	2	15	2	4	2	2	\N	2024-06-10 12:08:59.74+00	2024-06-10 12:08:59.74+00	\N
17	2	12	5	4	2	2	\N	2024-06-10 12:09:46.744+00	2024-06-10 12:11:42.489+00	\N
\.


--
-- Data for Name: tbl_transactions_history; Type: TABLE DATA; Schema: game_server; Owner: postgres
--

COPY game_server.tbl_transactions_history (id, "playerId", "itemId", type, "quantityChange", "totalAmountChange", "previousQuantity", "currentQuantity", "createdAt", "updatedAt") FROM stdin;
1	2	11	buy	2	440	2	4	2024-06-10 11:54:25.517+00	2024-06-10 11:55:20.695+00
2	2	11	buy	2	440	0	2	2024-06-10 11:55:25.936+00	2024-06-10 11:55:25.957+00
3	2	11	buy	2	440	0	2	2024-06-10 11:56:31.202+00	2024-06-10 11:56:31.21+00
4	2	12	buy	2	440	0	2	2024-06-10 11:57:20.726+00	2024-06-10 11:57:36.297+00
5	2	11	buy	2	440	0	2	2024-06-10 12:00:06.995+00	2024-06-10 12:00:21.569+00
6	2	12	buy	2	440	0	2	2024-06-10 12:01:52.453+00	2024-06-10 12:02:11.732+00
7	2	12	sell	2	8	2	0	2024-06-10 12:07:20.687+00	2024-06-10 12:07:20.7+00
8	2	11	sell	2	8	2	0	2024-06-10 12:08:32.315+00	2024-06-10 12:08:32.324+00
9	2	15	buy	2	440	0	2	2024-06-10 12:08:59.751+00	2024-06-10 12:08:59.757+00
10	2	12	buy	3	660	0	3	2024-06-10 12:09:46.756+00	2024-06-10 12:09:46.765+00
11	2	12	buy	4	880	3	7	2024-06-10 12:11:18.991+00	2024-06-10 12:11:19+00
12	2	12	sell	2	8	7	5	2024-06-10 12:11:42.494+00	2024-06-10 12:11:42.505+00
\.


--
-- Data for Name: tbl_player; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_player (id, username, password, email, "displayName", type, activated, deleted, "createdBy", "updatedBy", "deletedBy", "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	admin	$2a$10$xqTvrvUqUAutOoprXdu86O5o5ZZaWIi1SwROXM65QnfjnHMVPBGjG	admin@gmail.com	Admin	5	t	f	\N	\N	\N	\N	\N	\N
2	player1	$2a$10$CZM5hJtFznzvNaQHuccEH.vy/EsFb9lv0IbZYm/Fl3sUfhfksAPcy	player1@gmail.com	Mechanical	2	t	f	\N	\N	\N	\N	\N	\N
3	player2	$2a$10$wSGT9sBQV2d6Y6vFkaEMZOG/0coW0oYRx4gykbp1VUPFTEtUlXsf.	player2@gmail.com	player2	2	t	f	\N	\N	\N	\N	\N	\N
4	player3	$2a$10$Ow4zH0mlDDgD1H7swlDJB.lGFOod9/71RQ4XXiFkkEokH29dMX0Ve	player3@gmail.com	player3	2	t	f	\N	\N	\N	\N	\N	\N
5	player4	$2a$10$fz0qz090S1SSLxs3p0C./ud8NnJBRjz7f551q/Z/wvpzFU147d/5K	player4@gmail.com	player4	2	t	f	\N	\N	\N	\N	\N	\N
6	player5	$2a$10$WohT3dpdsaaTyMOC2hgeZuUzEZrkfzu1HfhuaC4.TME4quFK9.O7G	player5@gmail.com	Mechanical	2	t	f	\N	\N	\N	\N	\N	\N
\.


--
-- Name: tbl_item_id_seq; Type: SEQUENCE SET; Schema: game_server; Owner: postgres
--

SELECT pg_catalog.setval('game_server.tbl_item_id_seq', 16, true);


--
-- Name: tbl_player_id_seq; Type: SEQUENCE SET; Schema: game_server; Owner: postgres
--

SELECT pg_catalog.setval('game_server.tbl_player_id_seq', 6, true);


--
-- Name: tbl_player_inventory_id_seq; Type: SEQUENCE SET; Schema: game_server; Owner: postgres
--

SELECT pg_catalog.setval('game_server.tbl_player_inventory_id_seq', 17, true);


--
-- Name: tbl_transactions_history_id_seq; Type: SEQUENCE SET; Schema: game_server; Owner: postgres
--

SELECT pg_catalog.setval('game_server.tbl_transactions_history_id_seq', 12, true);


--
-- Name: tbl_player_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_player_id_seq', 6, true);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: game_server; Owner: postgres
--

ALTER TABLE ONLY game_server."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: tbl_item tbl_item_pkey; Type: CONSTRAINT; Schema: game_server; Owner: postgres
--

ALTER TABLE ONLY game_server.tbl_item
    ADD CONSTRAINT tbl_item_pkey PRIMARY KEY (id);


--
-- Name: tbl_player_inventory tbl_player_inventory_pkey; Type: CONSTRAINT; Schema: game_server; Owner: postgres
--

ALTER TABLE ONLY game_server.tbl_player_inventory
    ADD CONSTRAINT tbl_player_inventory_pkey PRIMARY KEY (id);


--
-- Name: tbl_player tbl_player_pkey; Type: CONSTRAINT; Schema: game_server; Owner: postgres
--

ALTER TABLE ONLY game_server.tbl_player
    ADD CONSTRAINT tbl_player_pkey PRIMARY KEY (id);


--
-- Name: tbl_player tbl_player_username_key; Type: CONSTRAINT; Schema: game_server; Owner: postgres
--

ALTER TABLE ONLY game_server.tbl_player
    ADD CONSTRAINT tbl_player_username_key UNIQUE (username);


--
-- Name: tbl_transactions_history tbl_transactions_history_pkey; Type: CONSTRAINT; Schema: game_server; Owner: postgres
--

ALTER TABLE ONLY game_server.tbl_transactions_history
    ADD CONSTRAINT tbl_transactions_history_pkey PRIMARY KEY (id);


--
-- Name: tbl_player tbl_player_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_player
    ADD CONSTRAINT tbl_player_pkey PRIMARY KEY (id);


--
-- Name: tbl_player tbl_player_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_player
    ADD CONSTRAINT tbl_player_username_key UNIQUE (username);


--
-- PostgreSQL database dump complete
--

