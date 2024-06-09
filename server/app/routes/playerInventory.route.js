/* eslint-disable space-before-function-paren */
/* eslint-disable indent */

// our components
const playerInventoryController = require('../controllers/playerInventory.controller');

module.exports = function (app) {

	app.post('/api/v1/auth/player-inventories', playerInventoryController.create);

	
	app.get('/api/v1/auth/player-inventories/:id', playerInventoryController.getOneItemOfPlayer);

	
	app.get('/api/v1/auth/player-inventories', playerInventoryController.getAllPlayerItems);

	
	app.post('/api/v1/auth/player-inventories/sell', playerInventoryController.sellItems);

	app.post('/api/v1/auth/player-inventories/buy', playerInventoryController.buyItems);

	
	app.delete('/api/v1/auth/player-inventories/:id', playerInventoryController.delete);

};
