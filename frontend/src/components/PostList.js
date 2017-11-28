import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { getPostsByCategory, getAllPosts } from '../actions/post';
import Post from './Post'; 

class PostList extends Component {

	componentDidMount() {
		if (!this.props.category) {
			this.props.fetchAllPosts();
		} else {
			this.props.fetchPosts(this.props.category)
		}
	}

	render() {
		const { posts, category } = this.props
		const postListTitle = category ? ("Posts about " + category.name) : "All posts"

		return (
			<div> 
				<h2> {postListTitle} </h2>
				{ posts && posts.map( post => (
					<Post key={post.id} post={post} />
				))} 
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

export default connect(mapStateToProps, mapDispatchToProps)(PostList);