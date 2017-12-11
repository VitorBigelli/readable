import React, { Component } from 'react'; 
import { voteComment } from '../actions/actions_comments';
import { connect } from 'react-redux';


/* 
#########################################################################
							COMMENT COMPONENT 
#########################################################################
*/

class Comment extends Component {

	render() {
		const { comment, voteComment } = this.props
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
						Comment score: {comment.voteScore} | 
						<button 
							onClick={ () => voteComment(comment.id, "upVote")}
							className="vote-up-button"
						> Vote up </button> 
						<button 
							onClick={ () => voteComment(comment.id, "downVote")}
							className="vote-down-button"
						> Vote down </button>
					</div>

					<div className="comment-date">
						{ fullDate }
					</div>
				</div>

			</div>
		)
	}
}

function mapStateToProps({comments}) {
	return {
		comments: comments
	}
}

function mapDispatchToProps(dispatch) {
	return {
		voteComment: (commentId, option) => dispatch(voteComment(commentId, option))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);