/* eslint-disable space-before-function-paren */
/* eslint-disable indent */

// our components
const inventoryController = require('../controllers/inventory.controller');

module.exports = function (app) {

	app.post('/api/v1/auth/inventories', inventoryController.create);

	
	app.get('/api/v1/auth/inventories/:id', inventoryController.getOne);

	
	app.get('/api/v1/auth/inventories', inventoryController.getAll);

	
	app.put('/api/v1/auth/inventories/:id', inventoryController.update);

	
	app.delete('/api/v1/auth/inventories/:id', inventoryController.delete);

};
