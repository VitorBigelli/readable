import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/index'

class App extends Component {

	state = {
		categories: []
	}

	componentDidMount() {
		this.props.fetchCategories()
	}

  	render() {
  		const { categories } = this.props

	    return (
	      <div className="App">

	      	<ul className="categories-list">
	      		<h3 className="categories-list-header"> Choose a category: </h3>
	        	{ categories && categories.map( category => (
	        		<li key={category.name} className="categories-list-item">
	        			{ category.name }
	        		</li>
	        	)
	        	)}
	        </ul>
	      </div>
	    );
	  }
}

function mapStateToProps ({categories}) {
	return {
		categories: categories
	}
}

function mapDispatchToProps (dispatch) {
	return {
		fetchCategories: () => dispatch(fetchCategories())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

