export const getByCategory = (categoryName) => {

	return (

		fetch(
			'http://localhost:3001/'+categoryName+'/posts', 
			{
		  	  headers: { 
		     		'Authorization': 'get-categories' 
		      }
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

	var body = JSON.stringify(post);

	return (
		fetch(
			"http://localhost:3001/posts/",
			{
				method: "POST",
				body: body,
				headers: {
					'Authorization': 'post-post'
				}
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

export const getAll = () => {

	return (

		fetch(
			'http://localhost:3001/posts', 
			{
				headers: {
					'Authorization': 'get-posts'
				}
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