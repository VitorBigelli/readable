import React from 'react'; 
import { AvatarsList } from './AvatarsList';
import AutoheightTextarea from 'react-autoheight-textarea';

/* 
#########################################################################
							COMMENT MODAL 
#########################################################################
*/
export const CommentModal = ({postId, isEditing, createComment, editComment}) => {
	
	let commentAvatar = null

	function pickedAvatar(avatar) {
		commentAvatar = avatar
	}

	return (
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
				onClick={ () => this.closeCommentModal() }
				className="cancel-comment"
			> Cancel </button>
		</form>


	)
}
