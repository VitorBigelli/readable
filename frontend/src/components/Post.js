import React, { Component } from 'react'; 

class Post extends Component {

	constructor(props) {
		super(props); 
		this.state = {
			isEditing: this.props.isEditing ? true : false,
			isNew: this.props.isNew ? true : false
		}
	}

	render() {
		const { post } = this.props
		const { isEditing, isNew } = this.state
		return (
			!isEditing && 
			!isNew && 
			<div className="post-container"> 
				<p className="post-title"> {post.title} </p> 
				<p className="post-body"> {post.body} </p>
				<p className="post-author"> Posted by {post.author} </p>
			</div>
		
		)
	}

}

export default Post; 