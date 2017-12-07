import React from 'react'; 

export const PostModal = ({categories, post = {} }) => {
	return (
		<form
			className="post-form"
			onSubmit={ (event) =>  {
				this.handleSubmit(event)
			}}
		> 
			<h3> New post </h3>
			<input
				className="post-form-title"
				type="text"
				name="title"
				value={post.title}
				placeholder="Title"
			/>
			<textarea 
				name="body"
				className="post-form-body"
				value={post.body}
				placeholder="Write your post here... "
			/>
			<span> Category: </span>
				<select className="post-category" name="category" defaultValue={post.category}> 
					{categories && categories.map( category => (
						<option key={category.name} name={category.name} value={category.name}> {category.name} </option>
					))}
				</select>
				<br/>
			<div className="post-author-info"> 
				<span> Name: </span>
				<input 
					className="post-author-name"
					type="text"
					name="author"
					value={post.author}
				/>
			</div>
			<button
				className="post-form-button"
				type="submit"
			> Post </button>
			<button
				onClick={() => this.closePostModal()}
			> Cancel </button>
		</form>

	)
}