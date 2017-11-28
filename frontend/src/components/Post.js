import React, { Component } from 'react'; 

class Post extends Component {

	constructor(props) {
		super(props); 
		this.state = {
			isEditing: false
		}
	}

	render() {
		const { post } = this.props
		return (
			<div> 
				<p> {post.title} </p> 
				<p> {post.body} </p>
			</div>
		)
	}

}

export default Post; 