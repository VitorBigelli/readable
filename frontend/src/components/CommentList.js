import React, { Component } from 'react'; 
import Comment from './Comment';

/* 
#########################################################################
							COMMENT LIST COMPONENT 
#########################################################################
*/

export const CommentList = ({comments}) => {

	return (
		<ul className="comment-list"> 

		{ comments && comments.map( comment => (
			<li key={comment.id} className="comment-container">
				<Comment comment={comment} />
			</li>
		))}
		</ul>
	)
}



