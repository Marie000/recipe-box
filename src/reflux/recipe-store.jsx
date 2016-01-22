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
	postRecipe: function(recipe){
		this.recipes.push(recipe);
		this.fireUpdate();
		HTTP.post('/recipes',recipe).then(function(response){
			this.getRecipe();
		}.bind(this)) 
	},
	fireUpdate: function(){
		this.trigger('change', this.recipes)
	}
});

module.exports=RecipeStore;