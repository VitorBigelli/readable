import { url, headers, validateResponse } from './api_helper'

export const getCommentsByPost = (parentId) => {
	return (
		fetch(
			url + "posts/" + parentId + '/comments', 
			{
				"method": "GET",
				headers
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

export const postComment = (comment) => {

	return (
		fetch(
			url + '/comments', 
			{
				method: "POST",
				headers,
				body: JSON.stringify(comment)
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