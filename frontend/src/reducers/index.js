import { RECEIVE_CATEGORIES, ADD_CATEGORY } from '../actions/index'; 

const initialCategories = {
	categories: null
}

function categories ( state = initialCategories, action ) {
	switch(action.type) {
		case RECEIVE_CATEGORIES:
			const { categories } =  action

			return {
				...state,
				['categories']: categories
			}
		default:
			return state;
	}
}

export default categories;