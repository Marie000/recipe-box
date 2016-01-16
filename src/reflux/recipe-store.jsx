var HTTP = require('../services/httpservice.js');
var Reflux = require ('reflux');
var Actions = require ('./actions.jsx');

var RecipeStore = Reflux.createStore({
	listenables: [Actions],
	getRecipe: function(){
		HTTP.get('/recipes')
		.then(function(data){
			this.recipes=data;
			this.fireUpdate();
		}.bind(this));
	},
	postRecipe: function(){

	},
	fireUpdate: function(){
		this.trigger('change', this.recipes)
	}
})

module.exports=RecipeStore;