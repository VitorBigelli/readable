import * as ReadableAPI from '../util/ReadableAPI'; 

export const CREATE_POST = 'CREATE_POST'; 
export const EDIT_POST = 'EDIT_POST'; 
export const DELETE_POST = 'DELETE_POST'; 
export const VOTE_POST = 'VOTE_POST' 
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

export const removePost = ({id, deleted }) => {
	return {
		type: DELETE_POST,
		id,
		deleted
	}
}

export const updatePost  = ({id, title, body}) => {
	return {
		type: EDIT_POST, 
		id, 
		title,
		body
	}
}

export const updatePostScore = ({ id, voteScore }) => {
	return {
		type: VOTE_POST,
		id,
		voteScore
	}
}

export const getAllPosts = () => dispatch => (

	ReadableAPI.getAll()
		.then( function(response) {
			response.json().then( (data) => (
				dispatch(receivePosts(data))
			))
		})
)

export const getPostsByCategory = (category) => dispatch => (
	
	ReadableAPI.getByCategory(category)
		.then( function(response) {
			response.json().then( (data) => (
				dispatch(receivePosts(data))
			))
		})
)

export const postNewPost = (post) => dispatch => (

	ReadableAPI.postNewPost(post)
		.then( function(response) {
			response.json().then( (data) => (
				dispatch(createPost(data))
			) )
		})
)

export const deletePost = (postId) => dispatch => (

	ReadableAPI.deletePost(postId)
		.then( function(response) {
			response.json().then( (data) => (
				dispatch(removePost(data))
			))
		})
)

export const editPost = (id, title, body) => dispatch => (
	ReadableAPI.editPost(id, title, body)
		.then( function(response) {
			response.json().then( (data) => ( 
				dispatch(updatePost(data))
			))
		})
)

export const votePost = (id, option) => dispatch => (
	ReadableAPI.votePost(id, option)
		.then( function(response) {
			response.json().then( (data) => (
				dispatch(updatePostScore(data))
			))
		})
)

