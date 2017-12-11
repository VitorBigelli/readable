import { RECEIVE_COMMENTS, CREATE_COMMENT, VOTE_COMMENT } from '../actions/actions_comments';

function comments (state = {}, action) {
	const comments = state
	const { id } = action

	switch(action.type) {
		case RECEIVE_COMMENTS: 

			for (let i in action.comments) {
				
				const c = action.comments[i]
				
				if (!comments[c.parentId]) {
					comments[c.parentId] = {}
				}
				
				comments[c.parentId][c.id] = c
			}

			console.log(comments)

			return comments

		case CREATE_COMMENT: 

			return {
				...state,
				[action.parentId]: {
					...state[action.parentId], 
					[id]: action
			}
		}

		case VOTE_COMMENT: 

			return {
				...state, 
				[action.parentId]: {
					...state[action.parentId], 
					[id]: {
						...state[action.parentId][id], 
						"voteScore": action.voteScore
					}
				}
			}

		default:  
			return state
	}
}

export default comments;