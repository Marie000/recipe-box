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
	postRecipe: function(name,ingredients,instructions){
		var recipe = {
			"name":name,
			"ingredients":ingredients,
			"instructions":instructions,
			"key":Math.floor(Date.now()/1000)+name
		};
		this.recipes.push(recipe);
		this.fireUpdate();
	},
	fireUpdate: function(){
		this.trigger('change', this.recipes)
	}
})

module.exports=RecipeStore;