// Importing from react modules
import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Link, withRouter, Route } from 'react-router-dom';
import AutoheightTextarea from 'react-autoheight-textarea';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import serializeForm from 'form-serialize'

// Importing from /components
import { CommentList } from './CommentList';
import { PostModal } from './PostModal';

// Importing from /actions
import { deletePost, editPost, votePost } from '../actions/actions_posts';
import { getComments, postComment } from '../actions/actions_comments';

// Importing from /util
import generateId from '../util/idGenerator'

/* 
#########################################################################
							POST COMPONENT 
#########################################################################
*/
class Post extends Component {

	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);

		this.state = {
			isEditing: this.props.isEditing ? true : false,
			commentModalIsOpen: false,
			currentComment: "",
			dropdownOpen: false
		}
	}

	componentDidMount() {
		this.props.getComments(this.props.post.id)
	}

	handleSubmit(event) {
		event.preventDefault(); 

		const comment = event.target.comment
		
		this.setState( () => ({
			currentComment: comment.value,
			commentModalIsOpen: true
		}))
	}

	openPostModal = () => {
		this.setState( () => (
			{
			isEditing: true
			}
		))
	}

	closePostModal = () => {
		this.setState( () => (
			{
			isEditing: false
			}
		))
	}

	editPost = (e, id) => {
		e.preventDefault() 
		
		let values = serializeForm(e.target, {hash: true} )

		this.props.editPost(id, values.title, values.body);
		this.closePostModal();
	}

	createComment = (event) => {
		event.preventDefault(); 

		const comment = {
			id: generateId(),
			parentId: this.props.post.id,
			timestamp: Date.now(), 
			body: this.state.currentComment,
			author: event.target.author.value
		}

		this.props.createComment(comment);
		this.closeCommentModal();
	}


	closeCommentModal = () => {
		this.setState( () => ({
			commentModalIsOpen: false
		}))
	}

	showPostDetails = (e, post) => {
		e.preventDefault()
		const { category, id } = post
		this.props.displayPostDetails(this.props.history, category, id)
	}

	toggle = () => {
		this.setState( () => ({
			dropdownOpen: !this.state.dropdownOpen
		}))
	}

	render() {
		const { post, comments, removePost, categories, votePost, posts, isDetails } = this.props
		const { isEditing, commentModalIsOpen, currentComment } = this.state
		
		const date = new Date(post.timestamp)
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		const minutes = (date.getMinutes() > 10) ?  date.getMinutes() : ("0" + date.getMinutes()) 
		const fullDate = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + " at " + date.getHours() + ":" + minutes 

		const postComments = comments ? comments.filter( comment => comment.parentId === post.id) : []

		return (
			<div className="post-view">

				{/* POST VIEW*/}
				<div className="post-container">
						
					<div className="post-header">
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

						<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
				        	<DropdownToggle caret></DropdownToggle>
				        	<DropdownMenu>
				          		<DropdownItem
				          			className="edit-post-button"
				          			onClick={ () => (this.openPostModal())}
				          		> Edit post</DropdownItem>
				        		<DropdownItem 
				        			className="delete-post-button"
				        			onClick={ () => (removePost(post.id))}
				        		> Delete post</DropdownItem>
				    		</DropdownMenu>
				    	</Dropdown>
					</div>

			 		<div className="post-content">
			 			<h4 className="post-title"> {post.title} </h4> 
						<p className="post-body"> {post.body} </p>
					</div>

					<div className="post-footer"> 
							
						<p className="score-info">
							Post score: { post.voteScore } |
							<button
								onClick={ () => votePost(post.id, "upVote")}
								className="vote-up-button"
							>  Up vote </button>
							<button
								onClick={ () => votePost(post.id, "downVote")}
								className="vote-down-button"
							> Down vote </button>
						</p>
					
						<p className="post-details">
							{ postComments && postComments.length + " comments | "}
							{ !postComments && "No comments | "}
						&nbsp;
						<button 
							onClick={ (event) => this.showPostDetails(event, post)}
							className="post-details-link"
						>
							See post details
						</button>
						</p>
					</div>

					{ isDetails && (
						<form className="new-comment">
							<AutoheightTextarea 
								className="comment-input"
								placeholder="Write your comment..."
							/>
							<button
								className="comment-button"
							> Send </button>
						</form>
					)}

					{ postComments && 
						<CommentList comments={postComments} />
					}
				</div>

				{/* COMMENT MODAL */}
				<Modal 
					isOpen={commentModalIsOpen}
					className="comment-modal"
					onRequestClose={this.closeCommentModal}
					overlayClassName="overlay"
					contentLabel="CommentModal">
					<p> Write your name/nickname to post your comment: </p>
						<form 
							className="comment-author-form"
							onSubmit={ (event) => { 
								this.createComment(event)
							}}
						>	
							<input 
								type="text"
								className="comment-author"
								name="author"
							/>
							<button
								type="submit"
								className="save-comment">
								Post comment
							</button>
							<button 
								onClick={ () => this.closeCommentModal() }
								className="cancel-comment"
							> Cancel comment </button>
						</form>
				</Modal>

				{/* (EDIT) POST MODAL */}
				<Modal
					isOpen={isEditing}
					className="post-modal"
					onRequestClose={this.closeEditPostModal}
					overlayClassName="overlay"
					contentLabel="EditPostModal">
					<PostModal 
						categories={categories} 
						post={post} 
						closePostModal={this.closePostModal} 
						handleSubmit={ (event, id) => this.editPost(event, id)} />
				</Modal>

				

			</div>
		)
	}

}

function mapStateToProps ({categories, comments, posts}) {
	
	let newPosts = []

	for (let post in posts) {

		if (posts.hasOwnProperty(post)) {
			newPosts = newPosts.concat([ posts[post] ])
		}

	}

	let newComments = []

	for (let post in comments) {
		for (let comment in comments[post]) {
			newComments = newComments.concat([ comments[post][comment] ])
		}
	}

	return {
		comments: newComments,
		categories: categories,
		posts: newPosts 
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getComments: (postId) => dispatch(getComments(postId)),
		createComment: (comment) => dispatch(postComment(comment)),
		removePost: (postId) => dispatch(deletePost(postId)),
		editPost: (postId, title, body) => dispatch(editPost(postId, title, body)),
		votePost: (postId, option) => dispatch(votePost(postId, option))
	}
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Post)
); 