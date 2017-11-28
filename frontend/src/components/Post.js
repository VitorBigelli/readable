import React, { Component } from 'react'; 
import { getAllPosts } from '../actions/posts';
import { getComments } from '../actions/comments';
import { connect } from 'react-redux';
import { CommentList } from './CommentList';

class Post extends Component {

	constructor(props) {
		super(props); 
		this.state = {
			isEditing: this.props.isEditing ? true : false,
			isNew: this.props.isNew ? true : false
		}
	}

	componentDidMount() {
		this.props.getComments(this.props.post.id)
	}

	render() {
		const { post, comments } = this.props
		const { isEditing, isNew } = this.state

		return (
			!isEditing && 
			!isNew && 
			<div className="post-container">
				<p className="post-author"> Posted by {post.author} </p>
	 			<div className="post-content">
	 				<h4 className="post-title"> {post.title} </h4> 
					<p className="post-body"> {post.body} </p>
				</div>
				{ comments && 
					<CommentList comments={comments[post.id]} />
				}
			</div>
		)
	}

}

function mapStateToProps ({comments}) {
	console.log(comments)
	return {
		comments: comments
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getAllPosts: () => dispatch(getAllPosts()),
		getComments: (postId) => dispatch(getComments(postId))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Post); 