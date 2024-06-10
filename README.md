
<h1 align="center" style="border-bottom: none">🤖 In-Game Item Management System</h1>



### Tech stack: NodeJS + ExpressJS + PostgreSQL + Redis + Kafka
### Deployment: Docker

- **Redis**: Redis used for caching frequently accessed data, such as *item information* and *player inventories*, to improve performance and reduce database load.

- `Use Hash to store detailed information of each item`

- `Use Sorted Set to store information about each player's item`
- **Kafka**: Kafka used as a message broker to handle event-driven communication and asynchronous processing, such as *processing inventory updates and recording transaction logs*.

## System design

REST API 

![DB](/assets/Design.png)

## Database

![DB](/assets/DB_desgn.jpeg)


# Solution

- System architecture: Both Monolithic and Microservices are possible but I choose Monolithic (The time is 3 days, I am not confident to use Microservices)
- The system store item data, manage player inventory, and process transactions ⇒ ***heavy on data recording (write)***
- Database: Player(**coin: 10.000**, **capacity (Each item is 1 unit): < 1** ⇒ *Do not buy other items*), TransactionHistory, Item, PlayerInventory ⇒ I used PostgreSQL for storage data

# **Feature**

- **Manage player:**
    - *Login/Register*
    - *Get all, Get one*
    - *Get information*
    - *Create*
    - *Update*
    - *Delete*
- **Storing item data:**
    - *Create new items* => add data in Redis
    - *Get all, get one*
    - *Update items* => update data in Redis
    - *Delete item* => remove data in Redis
- **Manage player inventory:**
    - *Get all, get one*
    - *Sell item* ⇒ process transactions (create record)+ update list item :
        - **Constraints:**
            - The quantity sold must be less than or equal to the current number of items.
            - Quantity < 1
            - Item does not exist
            - After a successful sale, update the player's money (increase), reduce the player's inventory (decrease item or delete), and return the storage space (increase capacity).
            - Update the player's changed item in Redis.
            - Kafka creates a transaction record.
    - *Buy item* ⇒ process transactions (create record)+ update list item
        - **Constraints:**
            - Sufficient capacity
            - Quantity < 1
            - Item does not exist
            - Enough money
            - Upon successful purchase, update player's money (decrease), player's inventory (increase item) and increase storage space (reduce capacity)
            - Update the player's changed item in Redis.
            - Kafka creates a transaction record.
- **Transaction history:** Kafka takes care of the message queue to create records
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

Option 2: Using docker

`docker build -t <"name"> . `

`docker compose up`



## Demo

Run demo in your local machine.


DB:Migration

```bash
npm run migrate:up
```

DB:Seed

```bash
npx sequelize-cli db:seed:all
```

`npm run dev`


Final Step:

Open [http://localhost:7500](http://localhost:7500) => API

#### Postman Collection:  

[Open Collection Folder](./assets/Game_Server.postman_collection.json)




