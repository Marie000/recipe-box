var InputForm = require('./form.jsx');
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
            }],
        };
    },
    
    componentWillMount: function(){
        //send recipes to local storage - only the first time you load the page
        if(localStorage.getItem('recipes')==null){
        localStorage.setItem('recipes',JSON.stringify(this.state.recipes));
        }

        Actions.getRecipe();
    },
    
    onChange: function(event, newRecipes){
        this.setState({
            recipes:newRecipes
        });        
    },

    render:function(){
        var RecipeItem = this.state.recipes.map(function(item){
             return <Recipe myKey={item.key} name={item.name} ingredients={item.ingredients} instructions={item.instructions} />
         })
        return(
            <div className="panel-heading">
                    <div className="container">
                        <div id="accordion" className="panel-group">
                            <div className="panel panel-default">              
                            {RecipeItem}
                            <InputForm editing={false}/>
            </div>
            </div></div></div>
        
        )
    }

})

module.exports = RecipeList;