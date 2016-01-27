var HTTP = require('../services/httpservice.js');
var Reflux = require ('reflux');
var Actions = require ('./actions.jsx');

var RecipeStore = Reflux.createStore({
	listenables: [Actions],

	getRecipe: function(){
		console.log("the getRecipe function should get this from local storage: "+localStorage.getItem('recipes'+0));
		/*var array=[];
		for(var x=0;x<1;x++){
			var newItem = JSON.parse(localStorage.getItem('recipes'+x));
			array.push(newItem)
		}
		this.recipes=array;
		*/
		this.recipes = JSON.parse(localStorage.getItem('recipes'));
		console.log("this is what this.recipes is now: "+this.recipes.toString());
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
		this.fireUpdate();
		localStorage.setItem("recipes",JSON.stringify(this.recipes));
		this.getRecipe();
		/*
		HTTP.post('/recipes',recipe).then(function(response){
			this.getRecipe();
		}.bind(this)) */
	},
	deleteRecipe:function(newkey){
	var array = JSON.parse(localStorage.getItem("recipes"));
	console.log("before: "+array);
	for (var i =0; i < array.length; i++){
    if (array[i].key === newkey) {
      console.log('found');
      array.splice(i,1);

   }
   console.log("after: "+array);
   localStorage.setItem("recipes",JSON.stringify(array));
   this.getRecipe();
/*		HTTP.delete('/recipes',recipe).then(function(response){
			this.getRecipe();
		}).bind(this)*/
	}},
	fireUpdate: function(){
		console.log('fireUpdate has been fired')
		this.trigger('change', this.recipes);
	}
});

module.exports=RecipeStore;