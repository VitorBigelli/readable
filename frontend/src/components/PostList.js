import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { getPostsByCategory } from '../actions/post';
import Post from './Post'; 

class PostList extends Component {

	constructor(props) {
		super(props); 
		this.state = { 
			category: this.props.category
		}
	}

	componentDidMount() {
		this.props.fetchPosts(this.props.category)
	}

	render() {

		const { posts } = this.props

		return (
			<div> 
				{ posts && posts.map( post => (
					<Post post={post} />
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
		fetchPosts: (category) => dispatch(getPostsByCategory(category))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);