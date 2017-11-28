import { RECEIVE_CATEGORIES, ADD_CATEGORY } from '../actions/index'; 
import posts from './posts';
import comments from './comments';
import { combineReducers } from 'redux';

function categories ( state = [], action ) {
	switch(action.type) {
		case RECEIVE_CATEGORIES:
			const { categories } =  action
			return categories;

		default:
			return state;
	}
}

export default combineReducers({categories, posts, comments});