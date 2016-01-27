var Reflux = require ('reflux');

var Actions = Reflux.createActions([
	'getRecipe','postRecipe','deleteRecipe'
	]);

module.exports = Actions;