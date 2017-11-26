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
	    return (
	      <div className="App">
	        Hello World
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

