-- Switch to the new database
\connect game_item_management;

-- Create the schema
CREATE SCHEMA IF NOT EXISTS game_server;

-- Create user with password and grant privileges
CREATE USER postgres WITH PASSWORD 'password';

-- Grant privileges on the new database and schema
GRANT ALL PRIVILEGES ON DATABASE game_item_management TO postgres;
GRANT USAGE ON SCHEMA game_server TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA game_server TO postgres;
