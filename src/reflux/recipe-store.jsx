var HTTP = require('../services/httpservice.js');
var Reflux = require ('reflux');
var Actions = require ('./actions.jsx');

var RecipeStore = Reflux.createStore({
	listenables: [Actions],
	getRecipe: function(){
		this.recipes = JSON.parse(localStorage.getItem('recipes'));
		this.fireUpdate();
		/*
		HTTP.get('/recipes')
		.then(function(data){
			this.recipes=data;
			this.fireUpdate();
		}.bind(this));*/
	},
	postRecipe: function(recipe){
		this.recipes.push(recipe);
		localStorage.setItem('recipes',JSON.stringify(this.recipes));
		this.fireUpdate();
		this.getRecipe();
		/*
		HTTP.post('/recipes',recipe).then(function(response){
			this.getRecipe();
		}.bind(this)) */
	},
	deleteRecipe:function(newkey){
		var array = JSON.parse(localStorage.getItem("recipes"));
		for (var i =0; i < array.length; i++){
			if (array[i].key === newkey) {
				array.splice(i,1);
			}
			localStorage.setItem("recipes",JSON.stringify(array));
			this.getRecipe();
		}
/*		HTTP.delete('/recipes',recipe).then(function(response){
			this.getRecipe();
		}).bind(this)*/
	},
	updateRecipe:function(recipe,oldKey){
		var array = JSON.parse(localStorage.getItem("recipes"));
		for (var i =0; i < array.length; i++){
			if (array[i].key === oldKey) {
				array.splice(i,1,recipe);
			}
		}
		localStorage.setItem("recipes",JSON.stringify(array));
		this.getRecipe();
	},
	fireUpdate: function(){
		this.trigger('change', this.recipes);
	}
});

module.exports=RecipeStore;