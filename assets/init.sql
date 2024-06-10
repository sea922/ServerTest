CREATE DATABASE game_item_management;
\c game_item_management;

CREATE SCHEMA IF NOT EXISTS game_server;

CREATE USER postgres WITH PASSWORD 'password';

GRANT ALL PRIVILEGES ON DATABASE game_item_management TO postgres;

GRANT USAGE ON SCHEMA game_server TO postgres;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA game_server TO postgres;
