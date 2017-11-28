import { RECEIVE_COMMENTS } from '../actions/comments';

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
		default: 
			return state
	}
}

export default comments;