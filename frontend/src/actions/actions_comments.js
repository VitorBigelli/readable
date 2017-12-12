import * as CommentsAPI from '../util/comments_util'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const CREATE_COMMENT = 'CREATE_COMMENT'; 
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT'; 
export const DELETE_COMMENT = 'DELETE_COMMENT'; 
export const VOTE_COMMENT = 'VOTE_COMMENT';

export const receiveComments = comments => {
	return {
		type: RECEIVE_COMMENTS, 
		comments
	}
}

export const getComments = (postId) => dispatch => (

	CommentsAPI.getCommentsByPost(postId)
		.then( function(response) {
			response.json().then( function(data) {
				dispatch(receiveComments(data));
			})
		})
)

export const createComment = comment => {
	return {
		type: CREATE_COMMENT,
		comment
	}
}

export const updateCommentScore = ({ id, parentId, voteScore }) => {
	return {
		type: VOTE_COMMENT,
		id,
		parentId,
		voteScore
	}
}

export const removeComment = ( { id, parentId, deleted } ) => {
	return {
		type: DELETE_COMMENT,
		id,
		parentId, 
		deleted
	}
}

export const postComment = comment => dispatch => (

	CommentsAPI.postComment(comment)
		.then( function(response) {
			response.json().then( function(data) {
				dispatch(createComment(Object.assign(comment, data)))
			})
		})
)


export const voteComment = (id, option) => dispatch => (
	CommentsAPI.voteComment(id, option)
		.then( function(response) {
			response.json().then( (data) => (
				dispatch(updateCommentScore(data))
			))
		})
)

export const deleteComment = (commentId) => dispatch => (
	CommentsAPI.deleteComment(commentId)
		.then( function(response) {
			response.json().then( (data) => (
				dispatch(removeComment(data))
			))
		})

)