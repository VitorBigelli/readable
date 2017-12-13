import { RECEIVE_POSTS, CREATE_POST, DELETE_POST, EDIT_POST, VOTE_POST } from '../actions/actions_posts';

function posts (state = null, action) {
	let posts = {}
	const { id } = action

	switch(action.type) {
		case RECEIVE_POSTS:

			for (let post in action.posts) {
				posts[action.posts[post].id] = action.posts[post]
			}

			return posts

		case CREATE_POST:
			
			return {
				...state,
				[id]: {
					...state[id], 
					"id": action.id, 
					"timestamp": Date.now(), 
					"title": action.title, 
					"body": action.body,
					"author": action.author,
					"avatar": action.avatar, 
					"category": action.category,
					"voteScore": action.voteScore,
					"deleted": action.deleted
				}
			}

		case DELETE_POST: 

			return {
				...state, 
				[id]: {
					...state[id],
					'deleted': action.deleted
				}
			}

		case EDIT_POST:

			return {
				...state, 
				[id]: {
					...state[id], 
					'title': action.title, 
					'body': action.body
				}
			}

		case VOTE_POST:

			return {
				...state, 
				[id]: {
					...state[id],
					'voteScore': action.voteScore
				}
			}

		default: 
			return state
	}
}

export default posts; 