import * as PostAPI from '../util/posts_util'; 

export const CREATE_POST = 'CREATE_POST'; 
export const EDIT_POST = 'EDIT_POST'; 
export const DELETE_POST = 'DELETE_POST'; 
export const VOTE_SCORE_UP_POST = 'VOTE_SCORE_UP_POST'; 
export const VOTE_SCORE_DOWN_POST = 'VOTE_SCORE_DOWN_POST'; 
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const receivePosts = categories => {
	return {
		type: RECEIVE_POSTS,
		categories
	}
}

export const getPostsByCategory = (category) => dispatch => (
	
	PostAPI.getByCategory(category)
		.then( function(response) {
			response.json().then( function(data) {
				dispatch(receivePosts(data))
			})


		})
)

export function createPost ({ title, body, author, category }) {
	return {
		type: CREATE_POST,
		title, 
		body, 
		author,
		category

	}
}

