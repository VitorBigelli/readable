import React from 'react'; 
import { AvatarsList } from './AvatarsList';

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
				<div>
					<h4> Edit comment </h4>
					<form 
						className="new-comment-form"
						onSubmit={ (event) => { 
							editComment(event)
						}}
					>
						<p> Comment: </p>
						<textarea
							name="comment" 
							className="comment-input"
							defaultValue={comment.body}
							placeholder="Write your comment..."
						/>
						<span> Name/nickname: </span>
						<input 
							type="text"
							className="comment-author-input"
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
				</div>
			)} 

			{!isEditing && (
				<div>
					<h4> New comment </h4>
					<form 
						className="new-comment-form"
						onSubmit={ (event) => { 
							createComment(event, commentAvatar)
						}}
					>
						<textarea
							name="comment" 
							className="comment-input"
							defaultValue=""
							placeholder="Write your comment..."
						/>
						<span> Name/nickname: </span>
						<input 
							type="text"
							className="comment-author-input"
							name="author"
						/>
						<br/>
						<span> Pick an avatar (optional): </span>  
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
				</div>
		)}

		</div>
	)
}
