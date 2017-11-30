import { RECEIVE_POSTS, CREATE_POST } from '../actions/posts';

function posts (state = [], action) {
	switch(action.type) {
		case RECEIVE_POSTS:
			const { posts } = action
			return posts

		case CREATE_POST:
			const { post } = action
			return state.concat([post])
		default: 
			return state
	}
}

export default posts; 