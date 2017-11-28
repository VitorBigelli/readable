import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { getPostsByCategory } from '../actions/post';

class PostList extends Component {

	componentDidMount() {
		this.props.fetchPosts()
	}

	render() {

		const { posts } = this.props
		console.log(posts)
		return (
			<div> {posts.map( post => {
				post.title
			})} </div>
		)
	}

}

function mapStateToProps( {posts}) {
	return {
		posts: posts
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchPosts: () => dispatch(getPostsByCategory('redux'))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);