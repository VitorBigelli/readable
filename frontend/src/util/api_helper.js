export const url = "http://localhost:3001/"; 
export const headers = { 'Content-Type': 'application/json', 'Authorization': 'react-readable'}

export const validateResponse = (response) => {
	if (response.status !== 200) {
		console.log('Something went wrong')
	}
	return response
}
