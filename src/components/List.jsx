
var React = require('react');
var Recipe = require('./Recipe.jsx');
var Reflux = require ('reflux');
var Actions = require ('../reflux/actions.jsx');
var RecipeStore = require ('../reflux/recipe-store.jsx');

var RecipeList = React.createClass({
    mixins:[Reflux.listenTo(RecipeStore, 'onChange')],
    getInitialState: function(){
        return{
            recipes:[{
                key:"001",
                name:"First recipe",
                ingredients:["1","2"],
                instructions:["a","b"]
            }]
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
    writeRecipe: function(){
        console.log('you clicked a button!')
    },
    render: function(){
        var RecipeItem = this.state.recipes.map(function(item){
            console.log(item.key)
            return <Recipe myKey={item.key} name={item.name} ingredients={item.ingredients} instructions={item.instructions} />
        })
        var RecipeNames = this.state.recipes.map(function(item){
            var recipeLink = "#"+item.key
            return <a href={recipeLink} data-toggle="collapse" data-parent="#accordion">{item.name}</a>
        })
        return(
            <div>
        <div id="accordion" className="panel-group">
            <div className="panel panel-default">
                
                {RecipeItem}
                        
</div></div>
        <button className="btn btn-default" onClick={this.writeRecipe}><span className="glyphicon glyphicon-plus"></span></button>
</div>
        
        )
    }

})

module.exports = RecipeList;