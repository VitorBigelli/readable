import { RECEIVE_POSTS, CREATE_POST, DELETE_POST, EDIT_POST, VOTE_POST } from '../actions/actions_posts';

function posts (state = null, action) {
	var newPosts = state;
	var posts = {}
	const { id } = action

	switch(action.type) {
		case RECEIVE_POSTS:

			for (let post in action.posts) {
				posts[action.posts[post].id] = action.posts[post]
			}

			return posts

		case CREATE_POST:
			
			newPosts[action.id] = {
				id: action.id, 
				timestamp: Date.now(), 
				title: action.title, 
				body: action.body,
				author: action.author, 
				category: action.category,
				voteScore: action.voteScore,
				deleted: action.deleted
			}

			return newPosts

		case DELETE_POST: 

			return {
				...state, 
				[id]: {
					...state[id],
					'voteScore': action.voteScore
				}
			}

		case EDIT_POST:

			newPosts[action.id] = {
				id: action.id, 
				timestamp: Date.now(), 
				title: action.title, 
				body: action.body,
				author: action.author,
				avatar: action.avatar, 
				category: action.category,
				voteScore: action.voteScore,
				deleted: action.deleted
			}

			return newPosts;

		case VOTE_POST:

			const { voteScore } = action
			newPosts[id].voteScore = voteScore

			return newPosts
		
		default: 
			return state
	}
}

export default posts; 