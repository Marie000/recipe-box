var HTTP = require('../services/httpservice.js');
var Reflux = require ('reflux');
var Actions = require ('./actions.jsx');

var RecipeStore = Reflux.createStore({
	listenables: [Actions],
	getRecipe: function(){
		console.log("the getRecipe function should get this from local storage: "+localStorage.getItem('recipes'));
		/*
		var array=[];
		for(var x=0;x<2;x++){
			var newItem = JSON.parse(localStorage.getItem('recipes'+x));
			array.push(newItem);
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
		console.log('before posting, this.recipes= '+this.recipes)
		this.recipes.push(recipe);
		console.log('after pushing new recipes, this.recipes= '+this.recipes)
		localStorage.setItem('recipes',JSON.stringify(this.recipes))
		console.log('then new this.recipes is sent to local storage: '+JSON.stringify(this.recipes))
		this.fireUpdate();
		/*for (var x=0;x<this.recipes.length;x++){
		localStorage.setItem("recipes"+x,JSON.stringify(this.recipes[x]));
		}*/
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
	updateRecipe:function(recipe,oldKey){
		var array = JSON.parse(localStorage.getItem("recipes"));
		for (var i =0; i < array.length; i++){
    		if (array[i].key === oldKey) {
      			console.log('found');
      			array.splice(i,1,recipe);
      		}
      	}
   		localStorage.setItem("recipes",JSON.stringify(array));
   		this.getRecipe();	
	},
	fireUpdate: function(){
		console.log('fireUpdate has been fired')
		this.trigger('change', this.recipes);
	}
});

module.exports=RecipeStore;