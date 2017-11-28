import * as CommentsAPI from '../util/comments_util'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const CREATE_COMMENT = 'CREATE_COMMENT'; 
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT'; 
export const DELETE_COMMENT = 'DELETE_COMMENT'; 
export const VOTE_SCORE_UP_COMMENT = 'VOTE_SCORE_UP_COMMENT';
export const VOTE_SCORE_DOWN_COMMENT = 'VOTE_SCORE_DOWN_COMMENT'; 

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