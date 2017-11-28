import { RECEIVE_CATEGORIES, ADD_CATEGORY } from '../actions/index'; 
import posts from './posts';
import { combineReducers } from 'redux';

const initialCategories = []

function categories ( state = initialCategories, action ) {
	switch(action.type) {
		case RECEIVE_CATEGORIES:
			const { categories } =  action
			return categories;

		default:
			return state;
	}
}

export default combineReducers({categories, posts});