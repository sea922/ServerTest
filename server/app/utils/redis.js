const redis = require("redis");
const Logger = require("./logger.utils");

const redisClient = redis.createClient({
  socket: { host: `${process.env.REDIS_HOST}`, port: `${process.env.REDIS_PORT}` },
  // legacyMode: true
});

redisClient.on("error", (err) => Logger.error("Redis Client Error", err));
redisClient.connect();
redisClient.on("connect", () => Logger.info("Connected to Redis successfully."));

function parseRedisResult(result) {
  const data = [];
  for (let i = 0; i < result.length; i += 1) {
    data.push(JSON.parse(result[i]));
  }
  return { rows: data, count: data.length };
}

function prepareRedisData(items) {
  const redisData = [];
  items.forEach((item) => {
    redisData.push(JSON.stringify(item));
  });
  return redisData;
}

async function saveItemsToRedis(listItems) {
  for (const i of listItems) {
    const { id, name, description, type, metadata, sellPrice, buyPrice, createdBy, updatedBy, deletedBy, createdAt, updatedAt, deletedAt } = i.item;

    const keyValuePairs = {
      'name': name,
      'description': description,
      'type': type,
      'metadata': JSON.stringify(metadata),
      'quantity': i.quantity,
      'sellPrice': sellPrice,
      'buyPrice': buyPrice,
      // "createdBy": createdBy,
      // "updatedBy": updatedBy,
      // "deletedBy": deletedBy,
      // "createdAt": createdAt,
      // "updatedAt": updatedAt,
      // "deletedAt": deletedAt
  };

    try {
      await redisClient.hSet(`item:${id}`, keyValuePairs);
      Logger.info(`Item ${id} saved to Redis.`);
      await redisClient.zAdd(`player_inventory:${i.playerId}`, {
        score: Date.now(),
        value: id,
      });
    } catch (error) {
      Logger.error(`Error saving item ${id} to Redis:` + error);
    }
  }
}

async function getPlayerItems(playerId) {
  try {
      const playerItemIds = await redisClient.zRange(`player_inventory:${playerId}`, 0, -1);

      const playerItems = [];

      for (const itemId of playerItemIds) {
          const itemDetails = await redisClient.hGetAll(`item:${itemId}`);
          playerItems.push({
            id: itemId, // ID of the player's item
            playerId: playerId, // ID of the player
            itemId: itemId, // ID of the item
            quantity: itemDetails.quantity,
            createdBy: itemDetails.createdBy,
            updatedBy: itemDetails.updatedBy,
            deletedBy: itemDetails.deletedBy,
            createdAt: itemDetails.createdAt,
            updatedAt: itemDetails.updatedAt,
            deletedAt: itemDetails.deletedAt,
            item: {
              id: itemId,
              name: itemDetails.name,
              description: itemDetails.description,
              type: itemDetails.type,
              metadata: JSON.parse(itemDetails.metadata),
              sellPrice: itemDetails.sellPrice,
              buyPrice: itemDetails.buyPrice
            }
        });

      }
      return { rows: playerItems, count: playerItems.length };

  } catch (error) {
      throw error;
  }
}

async function updateItem(itemId, updatedItem) {
  try {
      const itemExists = await redisClient.exists(`item:${itemId}`);
      if (!itemExists) {
          Logger.info(`Item with ID ${itemId} does not exist.`);
      }

      const keyValuePairs = [];
      for (const [key, value] of Object.entries(updatedItem)) {
          keyValuePairs.push(key, value.toString());
      }

      await redisClient.hSet(`item:${itemId}`,  keyValuePairs);
      
      return {
          success: true,
          message: `Item with ID ${itemId} updated successfully.`,
          updatedItem: updatedItem
      };
  } catch (error) {
      return {
          success: false,
          message: `Error updating item with ID ${itemId}: ${error.message}`,
          error: error
      };
  } 
}

async function deletePlayerItem(playerId, itemId) {
  try {
    const playerInventoryKey = `player_inventory:${playerId}`;
    const itemKey = `item:${itemId}`;

    const itemExists = await redisClient.zScore(playerInventoryKey, itemId);
    if (!itemExists) {
      return {
        success: false,
        message: `Item with ID ${itemId} does not exist in player ${playerId}'s inventory.`,
      };
    }

    await redisClient.zRem(playerInventoryKey, itemId);
    Logger.info(`Item with ID ${itemId} removed from player ${playerId}'s inventory.`);

    const itemHashExists = await redisClient.exists(itemKey);
    if (itemHashExists) {
      await redisClient.del(itemKey);
      Logger.info(`Item hash with ID ${itemId} deleted from Redis.`);
    }

    return {
      success: true,
      message: `Item with ID ${itemId} deleted from player ${playerId}'s inventory and Redis.`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error deleting item with ID ${itemId} from player ${playerId}'s inventory: ${error.message}`,
      error: error,
    };
  }
}


async function addItemToPlayerInventory(playerId, itemId, quantity, itemDetails) {
  try {
    const playerInventoryKey = `player_inventory:${playerId}`;
    const itemKey = `item:${itemId}`;

    await redisClient.zAdd(playerInventoryKey, Date.now(), itemId);
    Logger.info(`Item with ID ${itemId} added to player ${playerId}'s inventory.`);

    if (itemDetails) {
      const hashFields = {
        'name': itemDetails.name,
        'description': itemDetails.description,
        'type': itemDetails.type,
        'metadata': JSON.stringify(itemDetails.metadata),
        'quantity': quantity,
        'sellPrice': itemDetails.sellPrice,
        'buyPrice': itemDetails.buyPrice,
      };
      await redisClient.hSet(itemKey, hashFields);
      Logger.info(`Item details for ID ${itemId} stored in Redis.`);
    }

    return {
      success: true,
      message: `Item with ID ${itemId} added to player ${playerId}'s inventory.`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error adding item with ID ${itemId} to player ${playerId}'s inventory: ${error.message}`,
      error: error,
    };
  }
}


module.exports = {
  redisClient,
  parseRedisResult,
  prepareRedisData,
  saveItemsToRedis,
  getPlayerItems,
  updateItem,
  deletePlayerItem,
  addItemToPlayerInventory
};
