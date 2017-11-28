import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/index'
import CategoryList from './CategoryList';
import { Route } from 'react-router-dom';
import PostList from './PostList';

class App extends Component {

	constructor(props) {
		super(props); 
		this.state = {
			categories: []
		}
	}

	componentDidMount() {
		this.props.fetchCategories()
	}

  	render() {
  		const { categories } = this.props

	    return (
	      <div className="App">

	      	<Route 
	      		exact path="/" 
	      		render={ () => (
	      			<div className="main">
		      			<ul className="categories-list">
				      		<h3 className="categories-list-header"> Choose a category: </h3>
				        	<CategoryList categories={categories} />
				        </ul>

				        <ul className="posts"> 
				        	<PostList />
				        </ul>
				    </div>
			    )} 
			/>

  			{ categories && categories.map( category => (
  				<Route
  					key={category.name} 
	  				exact path={"/" + category.path}
	  				render={ () => ( 
	  						<PostList category={category.name} /> 
	  				)} 
  				/>
  			))}
	      
       	
	      </div>
	    )
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

