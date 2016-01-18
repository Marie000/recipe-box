var React = require('react');

var Recipe = React.createClass({
	render: function(){
	var ingredients = this.props.ingredients.map(function(item){
		return <li>{item}</li>
	});
	var instructions = this.props.instructions.map(function(item){
		return <li>{item}</li>
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
			</div>
			</div>
			</div></div>
			)
	}
})

module.exports=Recipe;