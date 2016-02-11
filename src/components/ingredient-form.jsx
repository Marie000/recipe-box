var React = require ('react');
var Reflux = require ('reflux');
var Actions = require ('../reflux/actions.jsx');
var RecipeStore = require ('../reflux/recipe-store.jsx');

var IngredientForm = React.createClass({
	render: function(){
		if(this.props.visibility){
			return(<div>
			
			</div>
			)
		}		
	}


})