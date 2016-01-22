var React = require ('react');
var Reflux = require ('reflux');
var Actions = require ('../reflux/actions.jsx');
var RecipeStore = require ('../reflux/recipe-store.jsx');


var Form = React.createClass({
	mixins:[Reflux.listenTo(RecipeStore, 'onChange')],
	getInitialState: function(){
		return {
			recipeName:"",
			ingredientInput:[],
			instructionInput:[]
		}
	},
	nameChange: function(e){
		this.setState({
			recipeName:e.target.value
		})
	},
	changeIngredients: function(e){
		this.setState({
			ingredientInput:e.target.value
		})
	},
	changeInstructions: function(e){
		this.setState({
			instructionInput:e.target.value
		})
	},
	onSubmit: function(e){
		if(this.state.recipeName){
			var newIngredients=this.state.ingredientInput.split(',');
			var newInstructions=this.state.instructionInput.split(',');
			var newRecipe={
				key: Math.floor(Date.now()/1000)+recipeName,
				name:this.state.recipeName,
				ingredients:newIngredients,
				instructions:newInstructions
			}
            Actions.postRecipe(newRecipe);
        };
        this.setState({recipeName:'',ingredientInput:[],instructionInput:[]});
	},
	render: function(){
		return(
			<div className="form-group container">
			<form role="form">
			<input placeholder="recipe name" value={this.state.recipeName} onChange={this.nameChange} className="form-control" />
			<br/>
			<input className="form-control" placeholder="ingredients (comma separated)" value={this.state.ingredientInput} onChange={this.changeIngredients} />
			<br/>
			<input className="form-control" placeholder="instructions (comma separated)" value={this.state.instructionInput} onChange={this.changeInstructions} />
			<br/>
			<button className="btn btn-default" onClick={this.onSubmit}><span className="glyphicon glyphicon-ok"></span></button>
			</form>
			</div>
			)
	}
})

module.exports=Form;