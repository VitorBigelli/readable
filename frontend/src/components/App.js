import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/index'
import CategoryList from './CategoryList';
import { Route } from 'react-router-dom';
import PostList from './PostList';
import { Provider } from 'react-redux'; 
import store from '../store/posts_store';

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
	      			<ul className="categories-list">
			      		<h3 className="categories-list-header"> Choose a category: </h3>
			        	<CategoryList categories={categories} />
			        </ul>
			    )} 
			/>

  			<Route 
  				exact path="/react"
  				render={ () => ( 
  					<Provider store={store}>
  						<PostList category='react' /> 
  					</Provider>
  				)} 
  			/>
	      
       	
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

