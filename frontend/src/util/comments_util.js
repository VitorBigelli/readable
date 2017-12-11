import { url, headers, validateResponse } from './api_helper'

export const getCommentsByPost = (postId) => {

	return (
		fetch(
			'http://localhost:3001/posts/'+postId+'/comments', 
			{
				headers: {
					'Authorization': 'get-comments'
				}
			}
		)
		.then( function(response) {
			if (response.status !== 200) {
				console.log("Something went wrong")
			}
			return response;
		})
		.catch( function(err) {
			console.log("ERROR")
		})
	)

}

export const postComment = (comment) => {

	return (
		fetch(
			'http://localhost:3001/comments', 
			{
				method: "POST",
				headers: {
					'Authorization': 'get-comments'
				}
			}
		)
		.then( function(response) {
			if (response.status !== 200) {
				console.log("Something went wrong")
			}
			return response;
		})
		.catch( function(err) {
			console.log("ERROR")
		})
	)
}


export const voteComment = (commentId, option) => {
	return (
		fetch(
			url + "comments/" + commentId,
			{
				method: "POST",
				headers, 
				body: JSON.stringify( { option } )
			}
		)
		.then( function(response) {
			return validateResponse(response)
		})
		.catch( function(err) {
			console.log("ERROR")
		})
	)
}