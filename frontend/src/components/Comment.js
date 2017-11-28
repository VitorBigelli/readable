import React, { Component } from 'react'; 

class Comment extends Component {

	render() {
		const { comment } = this.props

		return (
			<div>
				<p> {comment.author} </p> 
				<span> {comment.body} </span>
			</div>
		)
	}
}

export default Comment;