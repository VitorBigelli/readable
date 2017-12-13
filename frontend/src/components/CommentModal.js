import React from 'react'; 
import { AvatarsList } from './AvatarsList';
import AutoheightTextarea from 'react-autoheight-textarea';

/* 
#########################################################################
							COMMENT MODAL (STATELESS) COMPONENT
#########################################################################
*/
export const CommentModal = ({ isEditing, createComment, editComment, comment, closeCommentModal }) => {
	
	let commentAvatar = null

	function pickedAvatar(avatar) {
		commentAvatar = avatar
	}

	return (
			<div>
			{ isEditing && (
				<form 
					className="new-comment-form"
					onSubmit={ (event) => { 
						editComment(event)
					}}
				>
					<p> Comment: </p>
					<AutoheightTextarea
						name="comment" 
						className="comment-input"
						defaultValue={comment.body}
						placeholder="Write your comment..."
					/>
					<p> Name/nickname: </p>
					<input 
						type="text"
						className="comment-author"
						name="author"
						value={comment.author}
						readOnly
					/>
					<button
						type="submit"
						className="save-comment">
						Post
					</button>
					<button 
						onClick={ () => closeCommentModal() }
						className="cancel-comment"
					> Cancel </button>
				</form>
			)} 

			{!isEditing && (
				<form 
					className="new-comment-form"
					onSubmit={ (event) => { 
						createComment(event, commentAvatar)
					}}
				>
					<p> Comment: </p>
					<AutoheightTextarea
						name="comment" 
						className="comment-input"
						defaultValue=""
						placeholder="Write your comment..."
					/>
					<p> Name/nickname: </p>
					<input 
						type="text"
						className="comment-author"
						name="author"
					/>
					<p> Pick an avatar (optional): </p>
					<AvatarsList pickedAvatar={ (option) => pickedAvatar(option)} />
					<button
						type="submit"
						className="save-comment">
						Post
					</button>
					<button 
						onClick={ () => closeCommentModal() }
						className="cancel-comment"
					> Cancel </button>
				</form>
		)}

		</div>
	)
}
