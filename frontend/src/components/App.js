import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/index'
import CategoryList from './CategoryList';
import { Route } from 'react-router-dom';
import PostList from './PostList';
import Modal from 'react-modal';

class App extends Component {

	constructor(props) {
		super(props); 
		this.state = {
			postModalIsOpen: false,
			categories: []
		}
	}

	openPostModal = () => {
		this.setState( () => ({
			postModalIsOpen: true
		})
		)
	}

	closePostModal = () => {
		this.setState( () => ({
			postModalIsOpen: false
		})
		)
	}

	componentDidMount() {
		this.props.fetchCategories()
	}

  	render() {
  		const { categories, avatars } = this.props
  		const { postModalIsOpen } = this.state

	    return (
	      <div className="App">

	      	<button 
	      		onClick={this.openPostModal}
	      		className="new-post"
	      	> New Post </button>

	      	<Modal
	      		className="post-modal"
	      		overlayClassName="post-overlay"
	      		isOpen={postModalIsOpen}
	      		onRequestClose={this.closePostModal}
	      		contentLabel="PostModal"
	      	> 
	      			<form
	      				className="post-form"
	      				onSubmit={ (e) => e.preventDefault() }
	      			> 
	      				<h3> New post </h3>
	      				<input
	      					className="post-form-title"
	      					type="text"
	      					placeholder="Title"
	      				/>
	      				<textarea 
	      					className="post-form-body"
	      					placeholder="Write your post here... "
	      				/>
	      				<span> Category: </span>
	      					<select className="post-category"> 
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
		      				/>
		      			</div>
	      				<button> Post </button>
	      				<button> Cancel </button>
	      			</form>
	      	</Modal>

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

