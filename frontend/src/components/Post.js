import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import Modal from 'react-modal';
import AutoheightTextarea from 'react-autoheight-textarea';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { CommentList } from './CommentList';
import { getAllPosts, deletePost } from '../actions/actions_posts';
import { getComments, postComment } from '../actions/actions_comments';
import { PostModal } from './PostModal';

class Post extends Component {

	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);

		this.state = {
			isEditing: this.props.isEditing ? true : false,
			isNew: this.props.isNew ? true : false,
			commentModalIsOpen: false,
			currentComment: "",
			dropdownOpen: false
		}
	}

	generateId() {
		return Math.random().toString(36).substr(2,9);
	}

	handleSubmit(event) {
		event.preventDefault(); 

		const comment = event.target.comment
		
		this.setState( () => ({
			currentComment: comment.value,
			commentModalIsOpen: true
		}))
	}

	componentDidMount() {
		this.props.getComments(this.props.post.id)
	}

	createComment = (event) => {
		event.preventDefault(); 

		const comment = {
			id: this.generateId(),
			parentId: this.props.post.id,
			timestamp: Date.now(), 
			body: this.state.currentComment,
			author: event.target.author.value
		}

		this.props.createComment(comment);
		this.closeCommentModal();
	}

	editPost = () => {
		this.setState( () => (
			{
			isEditing: true
			}
		))
	}

	closeCommentModal = () => {
		this.setState( () => ({
			commentModalIsOpen: false
		}))
	}

	toggle = () => {
		this.setState( () => ({
				dropdownOpen: !this.state.dropdownOpen
			})
		)
	}

	render() {
		const { post, comments, removePost, categories } = this.props
		const { isEditing, isNew, commentModalIsOpen, currentComment } = this.state
		const date = new Date(post.timestamp)
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		const minutes = (date.getMinutes() > 10) ?  date.getMinutes() : ("0" + date.getMinutes()) 
		const fullDate = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + " at " + date.getHours() + ":" + minutes 

		return (
			<div className="post-view">
			{

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
				          			onClick={ () => (this.editPost())}
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
						<div className="post-interact"> 
							<span> Vote up </span>
							<span> Vote down </span>
						</div>
						<div className="post-comment">
							<form 
								onSubmit={ (event) => this.handleSubmit(event) } 
							>
								<AutoheightTextarea 
									defaultValue={currentComment}
									className="comment-input"
									type="text"
									name="comment"
									placeholder="Write a comment..."
								></AutoheightTextarea>
								<button 
									className="comment-button"	
									type="submit"
								>	Send
								</button>
							</form>
						</div>
					</div>

						{ comments && 
							<CommentList comments={comments[post.id]} />
						}

				</div>
			}

		<Modal 
			isOpen={commentModalIsOpen}
			className="comment-modal"
			onRequestClose={this.closeCommentModal}
			overlayClassName="overlay"
			contentLabel="CommentModal"
		>
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

		<Modal
			isOpen={isEditing}
			className="post-modal"
			onRequestClose={this.closeEditPostModal}
			overlayClassName="overlay"
			contentLabel="EditPostModal"
		>
			<PostModal categories={categories} post={post}/>
		</Modal>

		</div>

		)
	}

}

function mapStateToProps ({categories, comments}) {
	return {
		comments: comments,
		categories: categories
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getAllPosts: () => dispatch(getAllPosts()),
		getComments: (postId) => dispatch(getComments(postId)),
		createComment: (comment) => dispatch(postComment(comment)),
		removePost: (postId) => dispatch(deletePost(postId)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Post); 