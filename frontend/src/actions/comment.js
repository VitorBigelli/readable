export const CREATE_COMMENT = 'CREATE_COMMENT'; 
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT'; 
export const DELETE_COMMENT = 'DELETE_COMMENT'; 
export const VOTE_SCORE_UP_COMMENT = 'VOTE_SCORE_UP_COMMENT';
export const VOTE_SCORE_DOWN_COMMENT = 'VOTE_SCORE_DOWN_COMMENT'; 

export function createComment({ parentId, body, author }) {
	return {
		type: CREATE_COMMENT, 
		parentId, 
		timestamp: Date.now()
		body,
		author
	}
}