const url = "http://localhost:3001/"; 
const headers = { 'Content-Type': 'application/json', 'Authorization': 'react-readable'}

const validateResponse = (response) => {
  if (response.status !== 200) {
    console.log('Something went wrong')
  }
  return response
}

export const fetchCategories = () => {

  return (
  	fetch(
  		url + "categories", 
  		{
        method: "GET",
    	  headers
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
      url + 'comments', 
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

export const deleteComment = (commentId) => {
  return (
    fetch(
      url + "comments/" + commentId,
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

export const editComment = (commentId, body) => {
  return (
    fetch(
      url + "comments/" + commentId,
      {
        method: "PUT",
        headers,
        body: JSON.stringify({body})
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