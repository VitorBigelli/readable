// Importing from react modules
import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
import serializeForm from 'form-serialize'; 
import PropTypes from 'prop-types';

// Importing from /components
import { CommentList } from './CommentList';
import { PostModal } from './PostModal';
import { CommentModal } from './CommentModal';
import OptionsMenu from './OptionsMenu';

// Importing from /actions
import { deletePost, editPost, votePost } from '../actions/actions_posts';
import { getComments, postComment } from '../actions/actions_comments';

// Importing from /util
import generateId from '../util/idGenerator'
import { getFullDate } from '../util/getFullDate'


/* 
#########################################################################
							POST COMPONENT 
#########################################################################
*/
class Post extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isEditing: this.props.isEditing ? true : false,
			commentModalIsOpen: false,
			sortOption: 'timestamp',
		}
	}

	componentDidMount() {
		this.props.getComments(this.props.post.id)
	}

	openCommentModal = () => {
		this.setState( () => ({
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

	createComment = (e, avatar) => {
		e.preventDefault(); 

		const { post } = this.props
		const values = serializeForm(e.target, { hash: true } )

		if (values.comment && values.author) {

			const comment = {
				id: generateId(),
				parentId: post.id,
				timestamp: Date.now(), 
				avatar: avatar,
				body: values.comment,
				author: values.author
			}
			
			this.props.createComment(comment);
			this.closeCommentModal();
			this.props.history.push("/"+post.category+"/"+post.id)

		} else {
			window.alert("Please, fill all the required fields to public your comment")
		}


		
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

	deletePost = (postId) => {
		this.props.removePost(postId)
		this.props.history.push("/")
	}


	render() {
		const { post, comments, categories, votePost, isDetails } = this.props
		const { isEditing, commentModalIsOpen } = this.state
		const fullDate = getFullDate(post.timestamp)
		
		let postComments = comments ? comments.filter( comment => comment.parentId === post.id) : []
		postComments = postComments.filter( comment => !comment.deleted)
		
		return (

			<div> 
				{ !post.deleted && 
				<div>
					{/* POST VIEW*/}
					<div className="post-container">
							
						<div className="post-header">
							<img 
								className="post-avatar"
								src={process.env.PUBLIC_URL + post.avatar}
								width={80}
								alt="avatar"
							/>

							<p className="post-main-info"> {post.author} 
								<span className="post-complement-info"> posted on {post.category} category </span>
								<br/>
								<span className="post-date"> { fullDate } </span>
							</p>

							{isDetails && (
							<OptionsMenu 
								post={post} 
								openModal={() => this.openPostModal()}
								delete={ () => this.deletePost(post.id)}/>
					    	)}
						</div>

				 		<div className="post-content">
				 			<h4 className="post-title"> {post.title} </h4> 
							<p className="post-body"> {post.body} </p>
						</div>

						<div className="post-footer"> 
								
							<p className="post-score-info">
								Post score: { post.voteScore } | &nbsp;
								<button
									onClick={ () => votePost(post.id, "upVote")}
									className="vote-up-button"
								>  Vote up </button>
								<button
									onClick={ () => votePost(post.id, "downVote")}
									className="vote-down-button"
								> Vote down </button>
							</p>
						
							<p className="post-details">
								<span> { postComments && postComments.length + " comments"}
								{ !postComments && "No comments "}
								&nbsp; | &nbsp; 
								</span>

							{!isDetails && (
								<button 
									onClick={ (event) => this.showPostDetails(event, post)}
									className="post-details-link"
								>
									See details
								</button>
							)}

							{isDetails && (
								<button 
									className="new-comment-button"
									onClick={this.openCommentModal}
								/> 
							)}
							
							</p>
						</div>

						{ isDetails && postComments &&
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
						<CommentModal 
							isEditing={false} 
							createComment={(event, avatar) => this.createComment(event, avatar) } 
							closeCommentModal={ () => this.closeCommentModal()}
							/>
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
							isEditing={true}
							closePostModal={this.closePostModal} 
							handleSubmit={ (event, id, avatar) => this.editPost(event, id, avatar)} />
					</Modal>

				</div>
			}
			{ post.deleted && (
				<h3> POST DELETED </h3>
			)}
			</div>
		)
	}

}

function mapStateToProps ({categories, comments, posts}) {
	
	let newComments = []
	let newPosts = []

	for (let post in posts) {

		if (posts.hasOwnProperty(post)) {
			newPosts = newPosts.concat([ posts[post] ])
		}
	}

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

Post.propTypes = {
	comments: PropTypes.array.isRequired, 
	categories: PropTypes.array.isRequired, 
	posts: PropTypes.array.isRequired,
	getComments: PropTypes.func.isRequired, 
	createComment: PropTypes.func.isRequired, 
	removePost: PropTypes.func.isRequired, 
	votePost: PropTypes.func.isRequired,
	isDetails: PropTypes.bool
}