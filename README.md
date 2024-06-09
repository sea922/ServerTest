# In-Game Item Management System

### Tech stack: NodeJS + ExpressJS + PostgreSQL + Redis + Kafka

- **Redis**: Redis used for caching frequently accessed data, such as *item information* and *player inventories*, to improve performance and reduce database load.
- **Kafka**: Kafka used as a message broker to handle event-driven communication and asynchronous processing, such as *processing inventory updates and recording transaction logs*.

## System design

![DB](/Design.png)

# Demo
Click to view






## Installation

Clone this repository:

```bash
git https://github.com/sea922/ServerTest.git
cd server
```

Option 1:

Install the dependencies:

```bash
npm install
```

After

Install the dependencies:

```bash
yarn install
```

Option 2:

docker build -t <"name">

docker compose up



## Demo

Run demo in your local machine.


DB:Migration

```bash
npm run migrate:up --development
```

DB:Seed

```bash
npx sequelize-cli db:seed:all
```

`npm run dev`


Final Step:

Open [http://localhost:7500](http://localhost:7500) => API




