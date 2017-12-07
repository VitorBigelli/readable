import React, { Component } from 'react'; 

class Comment extends Component {

	render() {
		const { comment } = this.props
		const date = new Date(comment.timestamp)
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		const minutes = (date.getMinutes() > 10) ?  date.getMinutes() : ("0" + date.getMinutes()) 
		const fullDate = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + " at " + date.getHours() + ":" + minutes 

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

				<div className="comment-footer">
					<div className="comment-interact">
						<span> Vote up </span> 
						<span> Vote down </span> 
					</div>

					<div className="comment-date">
						{ fullDate }
					</div>
				</div>

			</div>
		)
	}
}

export default Comment;