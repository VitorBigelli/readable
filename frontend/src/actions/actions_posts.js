import * as PostAPI from '../util/posts_util'; 

export const CREATE_POST = 'CREATE_POST'; 
export const EDIT_POST = 'EDIT_POST'; 
export const DELETE_POST = 'DELETE_POST'; 
export const VOTE_SCORE_UP_POST = 'VOTE_SCORE_UP_POST'; 
export const VOTE_SCORE_DOWN_POST = 'VOTE_SCORE_DOWN_POST'; 
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const receivePosts = posts => {
	return {
		type: RECEIVE_POSTS,
		posts
	}
}

export const createPost = ({id, timestamp, title, body, author, avatar, category, voteScore, deleted }) => {
	return {
		type: CREATE_POST,
		id,
		timestamp,
		title,
		body, 
		author,
		avatar,
		category,
		voteScore, 
		deleted
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

export const postNewPost = (post) => dispatch => (

	PostAPI.postNewPost(post)
		.then( function(response) {
			response.json().then( (data) => (
				dispatch(createPost(Object.assign(post, data)))
			) )
		})
)

export const getAllPosts = () => dispatch => (

	PostAPI.getAll()
		.then( function(response) {
			response.json().then( (data) => (
				dispatch(receivePosts(data))
			))
		})
)

export const removePost = ({id, timestamp, title, body, author, avatar, category, voteScore, deleted }) => {
	return {
		type: DELETE_POST,
		id,
		timestamp,
		title,
		body, 
		author,
		avatar,
		category,
		voteScore, 
		deleted
	}
}

export const deletePost = (postId) => dispatch => (

	PostAPI.deletePost(postId)
		.then( function(response) {
			response.json().then( function(data) {
				dispatch(removePost(data))
			})
		})
)