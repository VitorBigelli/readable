import React, { Component } from 'react'; 
import Comment from './Comment';

export const CommentList = ({comments}) => {
	console.log(comments)
	return (
		comments && comments.map( comment => (
			<Comment comment={comment} />
		))
	)
}
