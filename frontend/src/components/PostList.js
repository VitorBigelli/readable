import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { getPostsByCategory, getAllPosts } from '../actions/actions_posts';
import Post from './Post'; 
import { withRouter } from 'react-router-dom';

class PostList extends Component {

	componentDidMount() {
		if (!this.props.category) {
			this.props.fetchAllPosts();
		} else {
			this.props.fetchPostsByCategory(this.props.category)
		}
	}

	render() {
		const { posts, category } = this.props
		const postListTitle = category ? ("Posts about " + category) : "All posts"

		return (
			<div className="main"> 
				<h2> {postListTitle} </h2>
				<ul className="posts-list"> 				        	
				{ posts && posts.map( post => (
					<li key={post.id}> <Post post={post} /> </li>
				))} 
				</ul>
			</div>
		)
	}

}

function mapStateToProps( {posts} ) {
	return {
		posts: posts
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchPostsByCategory: (category) => dispatch(getPostsByCategory(category)),
		fetchAllPosts: () => dispatch(getAllPosts())
	}
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(PostList)
);