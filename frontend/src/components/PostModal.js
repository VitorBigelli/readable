import React from 'react'; 

export const PostModal = ({categories, post = {}, closePostModal, handleSubmit }) => {
	
	return (
		<form
			className="post-form"
			onSubmit={ (event) =>  {
				handleSubmit(event, post.id)
			}}
		> 
			<h3> New post </h3>
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
			
			<p> Category: 
				<select 
					className="post-category" 
					name="category" 
					defaultValue={post.category} > 
					
					{categories && categories.map( category => (
						<option key={category.name} name={category.name} value={category.name}> {category.name} </option>
					))}

				</select>
			</p>

			<div className="post-author-info"> 
				<span> Name: </span>
				<input 
					className="post-author-name"
					type="text"
					name="author"
					defaultValue={post.author}
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

	)
}