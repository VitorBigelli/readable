const url = "http://localhost:3001/"; 
const headers = { 'Content-Type': 'application/json', 'Authorization': 'react-readable'}

function validateResponse(response) {
	if (response.status !== 200) {
		console.log('Something went wrong')
	}
	return response
}


export const getAll = () => {

	return (
		fetch(
			url + 'posts', 
			{
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

export const getByCategory = (categoryName) => {

	return (
		fetch(
			url + categoryName + '/posts', 
			{
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

export const postNewPost = (post) => {

	return (
		fetch(
			url + "posts/",
			{
				method: "POST",
				headers,
				body: JSON.stringify(post)
			}
		)
		.then( function(response) {
			return validateResponse(response)
		})
		.catch( function(err) {
			console.log('ERROR')
		})
	)
}

export const deletePost = (postId) => {
	return (
		fetch(
			url + "posts/" + postId, 
			{
				method: "DELETE",
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

export const editPost = ( postId, title, body ) => {
	return (
		fetch(
			url + "posts/" + postId, 
			{
				method: "PUT",
				headers,
				body: JSON.stringify( { title, body } )
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

export const votePost = (postId, option) => {
	return (
		fetch(
			url + "posts/" + postId,
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