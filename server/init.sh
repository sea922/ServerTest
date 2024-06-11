#!/bin/bash
set -e

# Start PostgreSQL service
pg_ctl start -D "$PGDATA" -l "$PGDATA/logfile.log"

# Wait for PostgreSQL to start
until pg_isready -q -h localhost -p 5432 -U "$POSTGRES_USER"
do
  echo "Waiting for PostgreSQL to start..."
  sleep 1
done

# Run initialization scripts
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE game_item_management;
    \c game_item_management
    CREATE SCHEMA IF NOT EXISTS game_server;
    CREATE USER postgres WITH PASSWORD 'password';
    GRANT ALL PRIVILEGES ON DATABASE game_item_management TO postgres;
    GRANT USAGE ON SCHEMA game_server TO postgres;
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA game_server TO postgres;
EOSQL

# Stop PostgreSQL service
pg_ctl stop -D "$PGDATA"

# Start PostgreSQL normally
exec "$@"
