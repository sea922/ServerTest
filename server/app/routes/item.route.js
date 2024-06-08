/* eslint-disable space-before-function-paren */
/* eslint-disable indent */

// our components
const ItemController = require('../controllers/item.controller');

module.exports = function (app) {

	app.post('/api/v1/auth/items', ItemController.create);

	
	app.get('/api/v1/auth/items/:id', ItemController.getOne);

	
	app.get('/api/v1/auth/items', ItemController.getAll);

	
	app.patch('/api/v1/auth/items/:id', ItemController.update);

	
	app.delete('/api/v1/auth/items/:id', ItemController.delete);

};
