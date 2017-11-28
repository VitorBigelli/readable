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