var React = require('react');
var Reflux = require ('reflux');
var Actions = require ('../reflux/actions.jsx');
var RecipeStore = require ('../reflux/recipe-store.jsx');
var Form = require('./form.jsx')

//this component will render the recipe, unless the editing button is clicked, 
//then it will render a pre-filled version of Form
var Recipe = React.createClass({
    mixins:[Reflux.listenTo(RecipeStore, 'onChange')],
	getInitialState: function(){
		return {editing:false};
	},
	//this function insures that the view returns to normal after editing is done
	onChange: function(){
		if(this.state.editing){
			this.setState({editing:false})
		}
	},
	onDelete: function(recipe){
		//remove from view
		this.setState({visible:false});
		//update the storage and retrieve new list from storage
		Actions.deleteRecipe(this.props.myKey)
    },
    onEdit: function(){
    	this.setState({editing:true})
    },
	render: function(){
	if (!this.state.editing){
	var ingredients = this.props.ingredients.map(function(item){
		return <li key={Math.floor(Math.random()*10)+item}>{item}</li>
	});
	var instructions = this.props.instructions.map(function(item){
		return <li key={Math.floor(Math.random()*10)+item}>{item}</li>
	});
	var linkid="#"+this.props.myKey
		return(
			<div>
			<div className="title">
			<div className="panel-heading">
			<a data-toggle="collapse" data-parent="#accordion" href={linkid}><h4>{this.props.name}</h4></a>
			<div className="collapse panel-collapse" id={this.props.myKey}>
			<div className="panel-body">
			<h5>Ingredients:</h5>
			<ul>{ingredients}</ul>
			<h5>Instructions:</h5>
			<ol>{instructions}</ol>
			<div className="buttons">
            <button className="btn btn-default" onClick={this.onDelete}><span className="glyphicon glyphicon-trash"></span></button>
            <button className="btn btn-default" onClick={this.onEdit}><span className="glyphicon glyphicon-pencil"></span></button>
            </div>

			</div></div>
			</div>
			</div></div>
			)

}
else{
	return <Form name={this.props.name} oldKey={this.props.myKey} ingredients={this.props.ingredients} instructions={this.props.instructions} editing={true}/>
}}

})

module.exports=Recipe;