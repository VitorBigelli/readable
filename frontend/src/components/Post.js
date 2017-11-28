import React, { Component } from 'react'; 

class Post extends Component {

	constructor(props) {
		super(props); 
		this.state = {
			isEditing: false
		}
	}

	render() {

		return (
			{ !isEditing && (
				

			)} 
		)
	}

}

export default Post; 