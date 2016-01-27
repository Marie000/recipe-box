var React = require ('react');
var Reflux = require ('reflux');
var Actions = require ('../reflux/actions.jsx');
var RecipeStore = require ('../reflux/recipe-store.jsx');


var Form = React.createClass({
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
			var newKey = Math.floor(Date.now()/1000)
			var newRecipe={
				key:newKey,
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


			<div className="panel-heading">
			<a data-toggle="collapse" data-parent="#accordion" href='#form'><h4>Add a recipe</h4></a>
			<div className="collapse panel-collapse" id='form'>
			<div className="panel-body">
			<div className="form-group container">
			<form role="form">
            <input placeholder="recipe name" value={this.state.recipeName} onChange={this.nameChange} className="form-control" />
            <br/>
            <input className="form-control" placeholder="ingredients (comma separated)" value={this.state.ingredientInput} onChange={this.changeIngredients} />
            <br/>
            <input className="form-control" placeholder="instructions (comma separated)" value={this.state.instructionInput} onChange={this.changeInstructions} />
            <br/>
            <button className="btn btn-default" type="button" onClick={this.onSubmit}><span className="glyphicon glyphicon-ok"></span></button>
            </form>
            </div>
            

			</div>
			</div>
			</div>

			)
	}
})

module.exports=Form;