var Reflux = require ('reflux');

var Actions = Reflux.createActions([
	'getRecipe','postRecipe','deleteRecipe','updateRecipe'
	]);

module.exports = Actions;