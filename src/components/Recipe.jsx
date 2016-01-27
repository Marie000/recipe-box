var React = require('react');
var Reflux = require ('reflux');
var Actions = require ('../reflux/actions.jsx');
var RecipeStore = require ('../reflux/recipe-store.jsx');


var Recipe = React.createClass({
	getInitialState: function(){
		return {visible:true};
	},
	onDelete: function(recipe){
		//this.setState({visible:false});
		Actions.deleteRecipe(this.props.myKey)
    },
	render: function(){
	var ingredients = this.props.ingredients.map(function(item){
		return <li key={Math.floor(Date.now()/1000)+item}>{item}</li>
	});
	var instructions = this.props.instructions.map(function(item){
		return <li key={Math.floor(Date.now()/1000)+item}>{item}</li>
	});
	var linkid="#"+this.props.myKey
		return(
			<div>
			<div className="panel-heading">
			<a data-toggle="collapse" data-parent="#accordion" href={linkid}><h4>{this.props.name}</h4></a>
			<div className="collapse panel-collapse" id={this.props.myKey}>
			<div className="panel-body">
			<h2>{this.props.name}</h2>
			<ul>{ingredients}</ul>
			<ol>{instructions}</ol>
            <button className="btn btn-default" onClick={this.onDelete}><span className="glyphicon glyphicon-trash"></span></button>


			</div>
			</div>
			</div></div>
			)

}
})

module.exports=Recipe;