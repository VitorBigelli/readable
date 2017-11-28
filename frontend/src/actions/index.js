import * as CategoryAPI from '../util/categories_api_util'; 

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const receiveCategories = categories =>  {
	return {
		type: RECEIVE_CATEGORIES,
		categories
	}
}

export const fetchCategories = () => dispatch => {
	
	CategoryAPI.fetchCategories()
		.then( response => {
			response.json().then( function(data) {
				dispatch(receiveCategories(data.categories))	
			})
		})
}
