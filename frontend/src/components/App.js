import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/index'
import { postNewPost } from '../actions/posts';
import CategoryList from './CategoryList';
import { Route, Switch, withRouter } from 'react-router-dom';
import PostList from './PostList';
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


	handleSubmit = (e) => {
		e.preventDefault() 
		let post = serializeForm(e.target, {hash: true} )
			
		post['id'] = Math.random().toString(36).substr(2,9);
		post['timestamp'] = Date.now();
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
	      		contentLabel="PostModal">
	      			<form
	      				className="post-form"
	      				onSubmit={ (event) =>  {
	      					this.handleSubmit(event)
	      				}}
	      			> 
	      				<h3> New post </h3>
	      				<input
	      					className="post-form-title"
	      					type="text"
	      					name="title"
	      					placeholder="Title"
	      				/>
	      				<textarea 
	      					name="body"
	      					className="post-form-body"
	      					placeholder="Write your post here... "
	      				/>
	      				<span> Category: </span>
	      					<select className="post-category" name="category"> 
	      						{categories && categories.map( category => (
	      							<option key={category.name} name={category.name} value={category.name}> {category.name} </option>
	      						))}
	      					</select>
	      					<br/>
	      				<div className="post-author-info"> 
		      				<span> Name: </span>
		      				<input 
		      					className="post-author-name"
		      					type="text"
		      					name="author"
		      				/>
		      			</div>
	      				<button
	      					className="post-form-button"
	      					type="submit"
	      				> Post </button>
	      				<button
	      					onClick={() => this.closePostModal()}
	      				> Cancel </button>
	      			</form>
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

