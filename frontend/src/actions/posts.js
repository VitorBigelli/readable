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

export const createPost = post => {
	return {
		type: CREATE_POST,
		post
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
			response.json().then( function(data) {
				data.id = post.id
				data.timestamp = post.timestamp
				data.title = post.title
				data.body = post.body
				data.author = post.author
				data.category = post.category
				dispatch(createPost(data))
			})
		})
)

export const getAllPosts = () => dispatch => (

	PostAPI.getAll()
		.then( function(response) {
			response.json().then( function(data) {
				dispatch(receivePosts(data))
			})
		})
)

