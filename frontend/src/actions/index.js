import * as ReadableAPI from '../util/ReadableAPI'; 

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const receiveCategories = categories =>  {
	return {
		type: RECEIVE_CATEGORIES,
		categories
	}
}

export const fetchCategories = () => dispatch => {
	
	ReadableAPI.fetchCategories()
		.then( response => {
			response.json().then( function(data) {
				dispatch(receiveCategories(data.categories))	
			})
		})
}
