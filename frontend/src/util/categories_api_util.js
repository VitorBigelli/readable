export const fetchCategories = () => {

  return (
	fetch(
		'http://localhost:3001/categories', 
		{
  	  headers: { 
     		'Authorization': 'get-categories' 
      }
 		}
   	)
   	.then( function(response) {
   		if (response.status !== 200) {
   			console.log('Something went wrong. Status: ', response.status)
   		}

      return response 

   	})
   	.catch( function(err) {
   		console.log("Error fetching")
   	})
  )
}
