const url = "http://localhost:3001/"; 
const headers = { 'Content-Type': 'application/json', 'Authorization': 'react-readable'}

export const getAll = () => {

	return (
		fetch(
			url + 'posts', 
			{
				headers
			}
		)
		.then( function(response) {
			if (response.status !== 200) {
				console.log('Something went wrong')
			}

			return response
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
 			if (response.status !== 200 ) {
 				console.log('Something went wrong.')
 			}
 			return response;
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
			if (response.status !== 200 ) {
				console.log("Something went wrong")
			}

			return response;

			response.json().then( (data) => {
				return data;
			})

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
			return response;
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
			if (response.status !== 200) {
				console.log("Something went wrong")
			}

			return response;
		})

	)

}