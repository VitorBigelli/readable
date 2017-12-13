import React from 'react'; 
import { AvatarsList } from './AvatarsList';
/* 
#########################################################################
							POST MODAL 
#########################################################################
*/

export const PostModal = ({categories, isEditing, post, closePostModal, handleSubmit }) => {
	
	let avatar = null

	function onCheck(checkedAvatar) {
		avatar = checkedAvatar
	}

	return (
		<div>
			{ !isEditing && (
				<form
					className="post-form"
					onSubmit={ (event) =>  {
						handleSubmit(event, avatar)
					}}
				> 
					<h3> New post </h3>
					<input
						className="post-form-title"
						type="text"
						name="title"
						defaultValue=""
						placeholder="Title"
					/>
					<textarea 
						name="body"
						className="post-form-body"
						defaultValue=""
						placeholder="Write your post here... "
					/>
			
					<p className="post-category"> Category: 
						<select 
							className="post-category" 
							name="category" 
						> 
							{categories && categories.map( category => (
								<option key={category.name} name={category.name} value={category.name}> {category.name} </option>
							))}
						</select>
					</p>
					<p> Pick an avatar: 
					<AvatarsList pickedAvatar={ (avatar) => onCheck(avatar)} />
					</p>
					<div className="post-author-info"> 
						<span> Name: </span>
						<input 
							className="post-author-name"
							type="text"
							name="author"
						/>
					</div>
					<button
						className="save-post"
						type="submit"
					> Post </button>
					<button
						className="cancel-post"
						onClick={(e) => {
							e.preventDefault();
							closePostModal();
						}}
					> Cancel </button>
				</form>
			)}

			{ isEditing && (
					<form
						className="post-form"
						onSubmit={ (event) =>  {
							handleSubmit(event, post.id, avatar)
						}}
					> 
					<h3> Edit post </h3> 
					<input
						className="post-form-title"
						type="text"
						name="title"
						defaultValue={post.title}
						placeholder="Title"
					/>
					<textarea 
						name="body"
						className="post-form-body"
						defaultValue={post.body}
						placeholder="Write your post here... "
					/>
					<button
						className="save-post"
						type="submit"
					> Post </button>
					<button
						className="cancel-post"
						onClick={(e) => {
							e.preventDefault();
							closePostModal();
						}}
					> Cancel </button>
				</form>
			)}
	
		</div>
	)
}