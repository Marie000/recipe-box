var React = require('react');

var Recipe = React.createClass({

	render: function(){
			var ingredients = this.props.ingredients.map(function(item){
		return <li>{item}</li>
	});
	var instructions = this.props.instructions.map(function(item){
		return <li>{item}</li>
	});
		return(
			<div>
			<h2>{this.props.name}</h2>
			<ul>{ingredients}</ul>
			<ol>{instructions}</ol>
			</div>
			)
	}
})

module.exports=Recipe;