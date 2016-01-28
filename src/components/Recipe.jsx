var React = require('react');
var Reflux = require ('reflux');
var Actions = require ('../reflux/actions.jsx');
var RecipeStore = require ('../reflux/recipe-store.jsx');
var Form = require('./form.jsx')


var Recipe = React.createClass({
    mixins:[Reflux.listenTo(RecipeStore, 'onChange')],
	getInitialState: function(){
		return {editing:false};
	},
	onChange: function(){
		if(this.state.editing){
			this.setState({editing:false})
		}
	},
	onDelete: function(recipe){
		//this.setState({visible:false});
		Actions.deleteRecipe(this.props.myKey)
    },
    onEdit: function(){
    	this.setState({editing:true})
    },
	render: function(){
	if (!this.state.editing){
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
            <button className="btn btn-default" onClick={this.onEdit}><span className="glyphicon glyphicon-pencil"></span></button>


			</div>
			</div>
			</div></div>
			)

}
else{
	return <Form name={this.props.name} oldKey={this.props.myKey} ingredients={this.props.ingredients} instructions={this.props.instructions} editing={true}/>
}}

})

module.exports=Recipe;