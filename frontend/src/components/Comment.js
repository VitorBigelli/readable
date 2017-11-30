import React, { Component } from 'react'; 

class Comment extends Component {

	render() {
		const { comment } = this.props

		return (
			<div>
				<img
					className="comment-avatar"
					src={comment.avatar}
					alt="avatar"
				/>
				<div className="comment-content">
					<span className="comment-author"> {comment.author} </span> 
					<span> {comment.body} </span>
				</div>
			</div>
		)
	}
}

export default Comment;