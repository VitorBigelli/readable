import React, { Component } from 'react'; 
import { voteComment, deleteComment, editComment } from '../actions/actions_comments';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OptionsMenu from './OptionsMenu';
import Modal from 'react-modal';
import { CommentModal } from './CommentModal';
import { getFullDate } from '../util/getFullDate';

/* 
#########################################################################
							COMMENT COMPONENT 
#########################################################################
*/

class Comment extends Component {

	constructor(props) {
		super(props); 

		this.state = {
			commentModalIsOpen: false
		}
	}

	editComment = (event) => {
		event.preventDefault();
		

		const { comment } = this.props

		this.props.editComment(comment.id, event.target.comment.value)
		this.closeCommentModal();
	}

	deleteComment = (commentId) => {
		this.props.deleteComment(commentId);
	}

	openCommentModal = () => {
		this.setState( () => ({
			commentModalIsOpen: true
		}))
	}

	closeCommentModal = () => {
		this.setState( () => ({
			commentModalIsOpen: false
		}))	
	}

	render() {
		const { comment, voteComment } = this.props
		const { commentModalIsOpen } = this.state
		
		const fullDate = getFullDate(comment.timestamp)

		return (
			<div>
				<div className="comment-container">
					<img
						className="comment-avatar"
						src={comment.avatar}
						alt="avatar"
					/>

					<OptionsMenu 
						className="comment-options"
						comment={comment} 
						openModal={ () => this.openCommentModal()} 
						delete={ () => this.deleteComment(comment.id)}/>

					<div className="comment-content">
						<span className="comment-author"> {comment.author} </span> 
						<span> {comment.body} </span>
					</div>
				</div>
				<div className="comment-footer">
					<div className="comment-interact">
						<span className="comment-score"> Comment score: {comment.voteScore} | </span>
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

				<Modal 
					isOpen={commentModalIsOpen}
					className="comment-modal"
					onRequestClose={this.closeCommentModal}
					overlayClassName="overlay"
					contentLabel="CommentModal">
					<CommentModal 
						isEditing={true} 
						editComment={(event) => this.editComment(event) } 
						comment={comment} 
						closeCommentModal={ () => this.closeCommentModal()}/>
				</Modal>

			</div>
		)
	}
}

function mapStateToProps() {
	return {}
}

function mapDispatchToProps(dispatch) {
	return {
		voteComment: (commentId, option) => dispatch(voteComment(commentId, option)),
		deleteComment: (commentId) => dispatch(deleteComment(commentId)),
		editComment: (commentId, commentBody) => dispatch(editComment(commentId, commentBody))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);

Comment.propTypes = {
	voteComment: PropTypes.func.isRequired,
	deleteComment: PropTypes.func.isRequired,
	editComment: PropTypes.func.isRequired
}