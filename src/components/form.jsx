var React = require ('react');
var Reflux = require ('reflux');
var Actions = require ('../reflux/actions.jsx');
var RecipeStore = require ('../reflux/recipe-store.jsx');
var IngredientForm = require('./ingredient-form.jsx')

var Form = React.createClass({
	getInitialState: function(){
		if(this.props.editing){
			return{
				recipeName:this.props.name,
				ingredients:this.props.ingredients,
				instructions:this.props.instructions,
				categories:this.props.categories
			};
		}
		else{
			return {
				recipeName:"",
				ingredients:[],
				instructions:[],
				categories:[]
		};		}
		
	},
	moreIngredients: function(e){
		var tempingredients = this.state.ingredients
		tempingredients.push(this.state.ingredientInput)
		this.setState({ingredients:tempingredients,
			ingredientInput:[]
		})
	},
	moreInstructions: function(e){
		var tempinstructions = this.state.instructions
		tempinstructions.push(this.state.instructionInput)
		this.setState({instructions:tempinstructions,
			instructionInput:[]
		})
	},	
	nameChange: function(e){
		this.setState({
			recipeName:e.target.value
		});
	},
	changeIngredients: function(e){
		this.setState({
			ingredientInput:e.target.value
		});
	},
	changeInstructions: function(e){
		this.setState({
			instructionInput:e.target.value
		});
	},
	
	deleteIngredient: function(e,ingredient){
		console.log(ingredient)
	},
	onSubmit: function(e){
		if(this.state.recipeName){
						var newKey = Math.floor(Date.now()/1000);
			var newRecipe={
				key:newKey,
				name:this.state.recipeName,
				ingredients:this.state.ingredients,
				instructions:this.state.instructions,
				categories:this.state.categories
			};
			if(!this.props.editing){
				Actions.postRecipe(newRecipe);
			}
			else{
				Actions.updateRecipe(newRecipe,this.props.oldKey);
			}
			this.setState({ingredients:[],instructions:[]})
		}
            this.setState({recipeName:'',ingredientInput:[],instructionInput:[]});
	},
	clearIngredients:function(){
		this.setState({ingredients:[]})
	},
	clearInstructions:function(){
		this.setState({instructions:[]})
	},
	setCategories:function(e){
		e.preventDefault();
		console.log('test')
		var array = [];
		array.push(e.target.value);
		this.setState({categories:array});
		console.log('categories',this.state.categories)
	},
	render: function(){
		console.log(this.state.ingredients)
		var ingredientList=this.state.ingredients.map(function(item){
			return (<li>{item}< /li>)
		})
		var instructionList=this.state.instructions.map(function(item){
			return (<li>{item}< /li>)
		})		
		console.log('categories', this.props.categories)
		//editing form
		var title;
		var myclass; 
		if(this.props.editing){
			title=this.props.name;
			myclass="collapse panel-collapse in";
			selected=this.props.categories[0];
			}
		else{
			title=<div className="add">Add a Recipe</div>
			myclass="collapse panel-collapse";
			selected=''
		}

		return(
			<div className="panel-heading form">
				<a data-toggle="collapse" data-parent="#accordion" href='#form'><h4>{title}</h4></a>
				<div className={myclass} id='form'>
					<div className="panel-body">
						<div className="form-group container">
							<form role="form">
								<h5>Recipe Name:</h5>
	 							<input placeholder={this.props.name} value={this.state.recipeName} onChange={this.nameChange} className="form-control" />
								<br/>
								<h5>Ingredients:</h5>
        					    <ul>
        					    {ingredientList} 
        					    </ul>
        					    <div className="row">
        					    	<div className="col-xs-10">
        					    		<input className="form-control ingredientInput" value={this.state.ingredientInput} onChange={this.changeIngredients} />
        					    	</div>
        					    	<div className="col-xs-2">
        					    		<button className="btn btn-default addButton" type="button" onClick={this.moreIngredients} >
        					    		<span className="glyphicon glyphicon-plus"></span></button>        					    
        					    	</div>
        					    </div>
        					    <button className="btn btn-default" type="button" onClick={this.clearIngredients}>Clear Ingredients</button>
            					<br/>
        					    <h5>Instructions:</h5>
        					    <ol>
        					    {instructionList} 
        					    </ol>
        					    <div className="row">
        					    	<div className="col-xs-10">
        					    		<input className="form-control instructionInput" value={this.state.instructionInput} onChange={this.changeInstructions} />
        					    	</div>
        					    	<div className="col-xs-2">
        					    		<button className="btn btn-default addButton" type="button" onClick={this.moreInstructions}>
        					    		<span className="glyphicon glyphicon-plus"></span></button>
        					    	</div>
        					    </div>
        					    <button className="btn btn-default" type="button" onClick={this.clearInstructions}>Clear Instructions</button> 
 								<br/>
 								<h5>Category:</h5>
 								<select onChange={this.setCategories} value ={this.state.categories} 
 								className="form-control" selected={selected}>
		
						            <option value="meals">Meals</option>
						            <option value="starters">Starters</option>
						            <option value="salads">Salads</option>
						            <option value="desserts">Desserts</option>
						            <option value="drinks">Drinks</option>
						            <option value="others">Others</option>

						          </select>
						          <br/>
            					<button className="btn btn-default submitButton" type="button" onClick={this.onSubmit}>Submit Recipe</button>
            				</form>
           				</div>
           			</div>
				</div>
			</div>
			)


//		   categories:['meals','starters','soups','salads','deserts','drinks','others'],

		/*	}
		//add recipe form
		else {
		return(
			<div className="panel-heading form">
				<a data-toggle="collapse" data-parent="#accordion" href='#form'><h4 className="add">Add a recipe</h4></a>
				<div className="collapse panel-collapse" id='form'>
					<div className="panel-body">
						<div className="form-group container">
							<form role="form">
					            <input placeholder="recipe name" value={this.state.recipeName} onChange={this.nameChange} className="form-control" />
        					    <br/>
        					    <h5>Ingredients:</h5>
        					    <ul>
        					    {ingredientList} 
        					    </ul>
        					    <input className="form-control ingredientInput" value={this.state.ingredientInput} onChange={this.changeIngredients} />
        					    <button className="btn btn-default" type="button" onClick={this.moreIngredients}>
        					    <span className="glyphicon glyphicon-plus"></span></button>
        					    <button className="btn btn-default" type="button" onClick={this.clearIngredients}>Clear Ingredients</button>        					    
            					<br/>
        					    <h5>Instructions:</h5>
        					    <ol>
        					    {instructionList} 
        					    </ol>
        					    <input className="form-control instructionInput" value={this.state.instructionInput} onChange={this.changeInstructions} />
        					    <button className="btn btn-default" type="button" onClick={this.moreInstructions}>
        					    <span className="glyphicon glyphicon-plus"></span></button>
        					    <button className="btn btn-default" type="button" onClick={this.clearInstructions}>Clear Instructions</button>        					            					    
            					<br/>            					
            					<br/>
            					<button className="btn btn-default" type="button" onClick={this.onSubmit}>
            					Submit Recipe</button>
            				</form>
            			</div>
            		</div>
				</div>
			</div>
			)
		}*/
	}
})

module.exports=Form;


