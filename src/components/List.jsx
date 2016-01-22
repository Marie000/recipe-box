
var React = require('react');
var Recipe = require('./Recipe.jsx');
var Reflux = require ('reflux');
var Actions = require ('../reflux/actions.jsx');
var RecipeStore = require ('../reflux/recipe-store.jsx');
var InputForm = require('./form.jsx');
var ReactDOM = require('react-dom');


var RecipeList = React.createClass({
    mixins:[Reflux.listenTo(RecipeStore, 'onChange')],
    getInitialState: function(){
        return{
            recipes:[{
                key:"001",
                name:"First recipe",
                ingredients:["1","2"],
                instructions:["a","b"]
            }],
            recipeName:"",
            ingredientInput:[],
            instructionInput:[]
        };
    },
    componentWillMount: function(){
        Actions.getRecipe();
    },
    onChange: function(event, recipes){
        this.setState({
            recipes:recipes
        });
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
                name:this.state.recipeName,
                ingredients:newIngredients,
                instructions:newInstructions
            }
            Actions.postRecipe(newRecipe);
        };
        this.setState({recipeName:'',ingredientInput:[],instructionInput:[]});
    },
    render: function(){
        var RecipeItem = this.state.recipes.map(function(item){
            return <Recipe myKey={item.key} name={item.name} ingredients={item.ingredients} instructions={item.instructions} />
        })
        var RecipeNames = this.state.recipes.map(function(item){
            var recipeLink = "#"+item.key
            return <a href={recipeLink} data-toggle="collapse" data-parent="#accordion">{item.name}</a>
        })
        return(
            <div className="container">
        <div id="accordion" className="panel-group">
            <div className="panel panel-default">              
                {RecipeItem}
         <div className="panel-heading">
            <a data-toggle="collapse" data-parent="#accordion" href="#form"><h4>Add a recipe</h4></a>
            <div className="collapse panel-collapse" id="form">
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
</div></div>
</div></div>
        
        )
    }

})

module.exports = RecipeList;