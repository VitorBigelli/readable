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
		const date = new Date(Date.now() - post.timestamp)
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		const fullDate = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + " at " + date.getHours() + ":" + date.getMinutes() 

		return (
			!isEditing && 
			!isNew && 
			<div className="post-container">
				
				<div className="post-header">
					<div className="post-info">
						<img 
							className="post-avatar"
							src={post.avatar}
							width={80}
							alt="avatar"
						/>
						<p className="post-main-info"> {post.author} 
							<span className="post-complement-info"> posted on {post.category} category </span>
							<br/>
							<span className="post-date"> { fullDate } </span>
						</p>
			 		</div>
			 	</div>

		 		<div className="post-content">
		 			<h4 className="post-title"> {post.title} </h4> 
					<p className="post-body"> {post.body} </p>
				</div>

				<div className="post-footer"> 
					<div className="post-interact"> 
						<span> Vote up </span>
						<span> Vote down </span>
						<span> Comment </span>
					</div>
					<div className="post-comment">
						
						<textarea 
							className="comment-input"
							type="text"
							value=""
							placeholder="Write a comment"
						/>

					</div>
				</div>

					{ comments && 
						<CommentList comments={comments[post.id]} />
					}

			</div>
		)
	}

}

function mapStateToProps ({comments}) {
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