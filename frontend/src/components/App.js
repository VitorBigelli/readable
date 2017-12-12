// Importing react packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import serializeForm from 'form-serialize';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import sortBy from 'sort-by';

// Importing /components
import CategoryList from './CategoryList';
import PostList from './PostList';
import Post from './Post';
import { PostModal } from './PostModal';
import { SortBy } from './SortBy';

// Importing /actions
import { fetchCategories } from '../actions/index'
import { postNewPost } from '../actions/actions_posts';

//Importing from /util
import generateId from '../util/idGenerator'

// Importing stylesheets 
import '../styles/bootstrap.min.css';
import '../App.css';

/* 
#########################################################################
							APP COMPONENT 
#########################################################################
*/

class App extends Component {

	constructor(props) {
		super(props); 
		this.state = {
			postModalIsOpen: false,
			currentPath: this.props.location.pathname,
			sort: null
		}
	}

	componentDidMount() {
		this.props.fetchCategories()
	}

	handleSubmit = (e) => {
		e.preventDefault() 
		
		let values = serializeForm(e.target, {hash: true} )
			
		const post = {
			id: generateId(),
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
		this.setState( () => (
			{
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

	sortPostsBy = (option) => {
		console.log(option)
		this.setState( () => ({
			sort: option
		})
		)
	}

  	render() {
  		const { categories, avatars, posts } = this.props
  		const { postModalIsOpen, currentPath, sort } = this.state
  		let sortedPosts = []

  		console.log(sortedPosts)

  		switch(sort) {
  			case "newest": 
  				sortedPosts = posts.sort(sortBy('timestamp')).reverse()
  				break;
  			case "oldest": 
  				sortedPosts = posts.sort(sortBy('timestamp'))
  				break;
  			case "highest": 
  				sortedPosts = posts.sort(sortBy('voteScore')).reverse()
  				break;
  			case "lowest": 
  				sortedPosts = posts.sort(sortBy('voteScore'))
  				break;
  			default: 
  				sortedPosts = posts.sort(sortBy('timestamp')).reverse()
  				break;
  		}

	    return (
	      <div className="App">

	      	<header>
	      			<Link to="/">
	      				<h1> React readable </h1>
	      			</Link>
		      		<button
				      		className="new-post-button"
				      		onClick={this.openPostModal}
				      		className="new-post"
				    > New Post </button>
	      	</header>

	      	<div className="container">
		      	<div className="nav-bar">
					<span> Filter: </span> 
			      	<CategoryList 
			      		categories={categories} 
			      		updateCategory={(history, category) => this.updateCategory(history, category)}  
			      		currentPath={currentPath}
			      	/>
			      	<span> Order by: </span> 
			      	<SortBy sortBy={ (option) => this.sortPostsBy(option) } />
			    </div>

				<Switch>
					<Route 
			      		exact path="/" 
			      		render={ () => (
			      			<PostList posts={sortedPosts} />
						)} 
					/>
		  			{ categories && categories.map( category => (
		  				<Route
		  					key={category.name} 
		  					exact
			  				path={"/" + category.path}
			  				render={ () => {
								return (
								<PostList category={category.name} posts={sortedPosts} /> 
								)
							}
							}
		  				/>
		  			))}
		  			{ posts && posts.map( post => (
		  				<Route 
							key={post.id}
							exact
							path={"/"+post.category+"/"+post.id} 
							render={ () => {
								return (
									<Post post={post} isDetails={true} />
								)
							}}
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

	    	</div>

	     	<footer> 
	      		Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
	     	</footer>
	    </div>
	    )
	}
}

function mapStateToProps ({categories, posts}) {
	let newPosts = []

	for (let post in posts) {

		if (posts.hasOwnProperty(post)) {
			newPosts = newPosts.concat([ posts[post] ])
		}

	}

	return {
		categories: categories,
		posts: newPosts
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

