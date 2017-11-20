import * as CategoryAPI from '../util/categories_api_util'; 

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const ADD_CATEGORY = 'ADD_CATEGORY';

export const receiveCategories = categories => ({
	type: RECEIVE_CATEGORIES,
	categories
})

export const getCategories = () => dispatch => (
	CategoryAPI
		.fetchCategories()
		.then( categories => dispatch(receiveCategories(categories)))
)