import { RECEIVE_POSTS } from '../actions/post';

function posts (state = {}, action) {
	switch(action.type) {
		case RECEIVE_POSTS:
			return {
				...state, 
				['posts']: action.categories
			}

		default: 
			return state
	}
}

export default posts; 