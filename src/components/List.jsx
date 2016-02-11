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
        key:"101",
        name: "Squirmy Pasta",
        ingredients: ["live worms","pasta sauce"],
        instructions: ["heat up pasta sauce","top live worms with pasta sauce","enjoy!"]
    },
    {
        key:"102",
        name: "BBQ squirrel",
        ingredients: ["1 large squirrel","BBQ sauce"],
        instructions: ["catch squirrel","cover squirrel with BBQ sauce","cook squirrel on BBQ until crunchy"]
    },
    {
        key:"103",
        name: "Compost Soup",
        ingredients: ["rotten apple cores","moldy banana peel","water","egg shells, crushed"],
        instructions: ["mix apple cores, banana peels and water","bring to a boil","simmer for 4-5 hours","served with crushed egg shells"]
    }],
    categories:['meals','drinks','deserts']
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