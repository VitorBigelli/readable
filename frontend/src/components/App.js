import React, { Component } from 'react';
import '../styles/bootstrap.min.css';
import '../App.css';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/index'
import { postNewPost } from '../actions/actions_posts';
import CategoryList from './CategoryList';
import { Route, Switch, withRouter } from 'react-router-dom';
import PostList from './PostList';
import { PostModal } from './PostModal';
import Modal from 'react-modal';
import serializeForm from 'form-serialize';

class App extends Component {

	constructor(props) {
		super(props); 
		this.state = {
			postModalIsOpen: false,
			currentPath: this.props.location.pathname,
			sortBy: 'none'
		}
	}

	componentDidMount() {
		const cachedPosts = localStorage.getItem('reactReadable')

		this.props.fetchCategories()
	}

	generateId() {
		return Math.random().toString(36).substr(2,9);
	}

	handleSubmit = (e) => {
		e.preventDefault() 
		
		let values = serializeForm(e.target, {hash: true} )
			
		const post = {
			id: this.generateId(),
			timestamp: Date.now(),
			title: values.title, 
			body: values.body,
			author: values.author, 
			category: values.category
		}

		this.props.postNewPost(post);
		this.closePostModal();
	}	

	updateCategory = (history, category) => {
		this.setState( () => ({
			currentPath: "/"+category
		}
		))		
		history.push("/"+category)
	}

	openPostModal = () => {
		this.setState( () => (
			{
			postModalIsOpen: true
			}
		))
	}

	closePostModal = () => {
		this.setState( () => (
			{
			postModalIsOpen: false
			}
		))
	}


  	render() {
  		const { categories, avatars } = this.props
  		const { postModalIsOpen, currentPath } = this.state

	    return (
	      <div className="App">

	      	<header>
	      			<h1> React readable </h1>
		      		<button
				      		className="new-post-button"
				      		onClick={this.openPostModal}
				      		className="new-post"
				    > New Post </button>
	      	</header>

	      	<div className="nav-bar">
				<span> Filter: </span> 
		      	<CategoryList 
		      		categories={categories} 
		      		updateCategory={(history, category) => this.updateCategory(history, category)}  
		      		currentPath={currentPath}
		      	/>
		      	<span> Order by: </span> 
		    </div>

			<Switch>
				<Route 
		      		exact path="/" 
		      		render={ () => (
		      			<PostList />
					)} 
				/>
	  			{ categories && categories.map( category => (
	  				<Route
	  					key={category.name} 
		  				path={"/" + category.path}
		  				render={ () => {
							return (
							<PostList category={category.name} /> 
							)
						}
						}
	  				/>
	  			))}
  			</Switch>
	      
	      	<Modal
	      		className="post-modal"
	      		overlayClassName="overlay"
	      		isOpen={postModalIsOpen}
	      		onRequestClose={this.closePostModal}
	      		contentLabel="PostModal"
	      	>
	      		<PostModal categories={categories} closePostModal={this.closePostModal} handleSubmit={this.handleSubmit} />	      			
	      	</Modal>

		   	<footer> 
       	  		Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
       	  	</footer>
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
		fetchCategories: () => dispatch(fetchCategories()),
		postNewPost: (post) => dispatch(postNewPost(post))
	}
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(App)
);

