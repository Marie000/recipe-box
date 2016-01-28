var React = require ('react');
var Reflux = require ('reflux');
var Actions = require ('../reflux/actions.jsx');
var RecipeStore = require ('../reflux/recipe-store.jsx');


var Form = React.createClass({
	getInitialState: function(){
		if(this.props.editing){
			return{
				recipeName:this.props.name,
				ingredientInput:this.props.ingredients,
				instructionInput:this.props.instructions
			}
		}
		else{
			return {
				recipeName:"",
				ingredientInput:[],
				instructionInput:[]
		};		}
		
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
		console.log(this.state.ingredientInput)
		if(this.state.recipeName){
			if(typeof this.state.ingredientInput=="string"){
			var newIngredients=this.state.ingredientInput.split(',');
			}
			else {
			var newIngredients=this.state.ingredientInput
			}
			if(typeof this.state.instructionInput=="string"){			
			var newInstructions=this.state.instructionInput.split(',');
			}
			else {
				var newInstructions=this.state.instructionInput
			}
			var newKey = Math.floor(Date.now()/1000)
			var newRecipe={
				key:newKey,
				name:this.state.recipeName,
				ingredients:newIngredients,
				instructions:newInstructions
			}
			if(!this.props.editing){
			this.state.count++;
            Actions.postRecipe(newRecipe);
        	}
        	else{
        	Actions.updateRecipe(newRecipe,this.props.oldKey);
        	} 
        };
        this.setState({recipeName:'',ingredientInput:[],instructionInput:[]});
	},
	render: function(){
			if(this.props.editing){
		return(
			<div className="panel-heading">
			<a data-toggle="collapse" data-parent="#accordion" href='#form'><h4>{this.props.name}</h4></a>
			<div className="collapse panel-collapse in" id='form'>
			<div className="panel-body">
			<div className="form-group container">
			<form role="form">
            <input placeholder={this.props.name} value={this.state.recipeName} onChange={this.nameChange} className="form-control" />
            <br/>
            <input className="form-control" placeholder={this.props.ingredients.toString()} value={this.state.ingredientInput} onChange={this.changeIngredients} />
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