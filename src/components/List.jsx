
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
        })
    },
    render: function(){
        var RecipeItem = this.state.recipes.map(function(item){
            return <Recipe key={item.key} name={item.name} ingredients={item.ingredients} instructions={item.instructions} />
        })
        return(
        <div>{RecipeItem}</div>
        )
    }

})


module.exports = RecipeList;