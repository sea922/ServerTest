/* eslint-disable space-before-function-paren */
/* eslint-disable indent */

// our components
const playerInventoryController = require('../controllers/playerInventory.controller');

module.exports = function (app) {

	app.post('/api/v1/auth/player-inventories', playerInventoryController.create);

	
	app.get('/api/v1/auth/player-inventories/:id', playerInventoryController.getOneItemOfPlayer);

	
	app.get('/api/v1/auth/player-inventories', playerInventoryController.getAllPlayerItems);

	
	app.patch('/api/v1/auth/player-inventories/:id', playerInventoryController.update);

	
	app.delete('/api/v1/auth/player-inventories/:id', playerInventoryController.delete);

};
