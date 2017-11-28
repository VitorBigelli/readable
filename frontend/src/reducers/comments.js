import { RECEIVE_COMMENTS } from '../actions/comments';

function comments (state = [], action) {
	switch(action.type) {
		case RECEIVE_COMMENTS: 
			const { comments } = action
			return comments
		default: 
			return state
	}
}

export default comments;