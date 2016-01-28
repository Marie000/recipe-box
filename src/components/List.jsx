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
        console.log("mounted with: "+JSON.stringify(this.state.recipes));
        if(localStorage.getItem('recipes')==null){
        localStorage.setItem('recipes',JSON.stringify(this.state.recipes));
    }
        /*
        for(x=0;x<this.state.recipes.length;x++){
            localStorage.setItem('recipes'+x,JSON.stringify(this.state.recipes[x]));
        } */       
        console.log("after mounting, local storage contains:"+ localStorage.getItem('recipes'));
        Actions.getRecipe();
    },
    
    onChange: function(event, newRecipes){
        this.setState({
            recipes:newRecipes
        });
        console.log('after coming back, this.state.recipes is now: '+this.state.recipes)
        
    },

    render:function(){
        var RecipeItem = this.state.recipes.map(function(item){
            console.log(item.key)
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