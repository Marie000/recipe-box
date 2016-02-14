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
        instructions: ["heat up pasta sauce","top live worms with pasta sauce","enjoy!"],
        categories: ['meals']
    },
    {
        key:"102",
        name: "BBQ squirrel",
        ingredients: ["1 large squirrel","BBQ sauce"],
        instructions: ["catch squirrel","cover squirrel with BBQ sauce","cook squirrel on BBQ until crunchy"],
        categories: ['meals']
    },
    {
        key:"103",
        name: "Compost Soup",
        ingredients: ["rotten apple cores","moldy banana peel","water","egg shells, crushed"],
        instructions: ["mix apple cores, banana peels and water","bring to a boil","simmer for 4-5 hours","served with crushed egg shells"],
        categories:['soups']
    },
    {
        key:"104",
        name: "Poison Ivy Salad",
        ingredients: ["poison ivy","your favorite salad dressing"],
        instructions: ["wear gloves","mix poison ivy and salad dressing"],
        categories:['salads']
    },
{
        key:"105",
        name: "Homegrown Herbal Tea",
        ingredients: ["grass clippings","water"],
        instructions: ["Bring water to a boil","Let grass clippings steap for 4-5 minutes","Enjoy!"],
        categories:['drinks']
    },

    ],
    categories:['meals','starters','soups','salads','desserts','drinks','others'],
    selectedCategory:'all'
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
    selectAll: function(){
        this.setState({selectedCategory:'all'})
    },
    selectMeals: function(){
        this.setState({selectedCategory:'meals'})
    },    
    selectStarters: function(){
        this.setState({selectedCategory:'starters'})
    },    
    selectSoups: function(){
        this.setState({selectedCategory:'soups'})
    },    
    selectSalads: function(){
        this.setState({selectedCategory:'salads'})
    },    
    selectDesserts: function(){
        this.setState({selectedCategory:'desserts'})
    },    
    selectDrinks: function(){
        this.setState({selectedCategory:'drinks'})
    },    
    selectOthers:function(){
        this.setState({selectedCategory:'others'})
    },

    render:function(){
        var selectedCategory = this.state.selectedCategory;
        var RecipeItem = this.state.recipes.map(function(item){
            if(item.categories.indexOf(selectedCategory)>-1 || selectedCategory==='all'){
             return <Recipe myKey={item.key} name={item.name} ingredients={item.ingredients} 
             instructions={item.instructions} categories={item.categories}/>
         }
         })

        return(
            <div className="container container-fluid">
            <ul className="tabs">
            <button className="btn btn-default" onClick={this.selectAll}>All</button>
            <button className="btn btn-default" onClick={this.selectMeals}>Meals</button>
            <button className="btn btn-default" onClick={this.selectStarters}>Starters</button>
            <button className="btn btn-default" onClick={this.selectSoups}>Soups</button>
            <button className="btn btn-default" onClick={this.selectSalads}>Salads</button>
            <button className="btn btn-default" onClick={this.selectDesserts}>Desserts</button>
            <button className="btn btn-default" onClick={this.selectDrinks}>Drinks</button>
            <button className="btn btn-default" onClick={this.selectOthers}>Others</button>
            </ul>
            <div className="panel-heading recipesSection">
                    <div className="container container-fluid">
                        <div id="accordion" className="panel-group">
                            <div className="panel panel-default">              
                            {RecipeItem}
                            <InputForm editing={false}/>
            </div>
            </div></div></div></div>
        
        )
    }

})

module.exports = RecipeList;