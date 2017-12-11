import { RECEIVE_COMMENTS, CREATE_COMMENT, VOTE_COMMENT } from '../actions/actions_comments';

function comments (state = {}, action) {

	const { id } = action

	switch(action.type) {
		case RECEIVE_COMMENTS: 

			for (let i in action.comments) {
				const c = action.comments[i]
				
				state[c.parentId] = state[c.parentId] ? state[c.parentId].concat([c]) : [c]
			}

			return state

		case CREATE_COMMENT: 

			return {
				...state,
				[action.parentId]: {
					...state[action.parentId], 
					[id]: action
			}
		}

		case VOTE_COMMENT: 

			for (let comment in state[action.parentId]) {
				if (state[action.parentId][comment].id === action.id) {
					state[action.parentId][comment].voteScore = action.voteScore
				}
			}

			return state

		default:  
			return state
	}
}

export default comments;