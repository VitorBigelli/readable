import { RECEIVE_COMMENTS, CREATE_COMMENT } from '../actions/actions_comments';

function comments (state = {}, action) {
	switch(action.type) {
		case RECEIVE_COMMENTS: 
			const { comments } = action
			if (comments.length !== 0) {
				return {
					...state,
					[comments[0].parentId]: comments
				}
			}
			else {
				return state;
			}
		case CREATE_COMMENT: 
			const { comment } = action
			return {
				...state,
				[comment.parentId]: state[comment.parentId] ? 
									state[comment.parentId].concat([comment]) : 
									[comment]
			}
		default:  
			return state
	}
}

export default comments;