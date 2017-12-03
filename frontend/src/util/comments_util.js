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