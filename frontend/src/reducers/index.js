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

function avatars (state = [], action) { 
	return [
		'../icons/rick.png',
		'../icons/morty.jpeg',
		'../icons/jerry.png',
		'../icons/beth.png',
		'../icons/summer.jpeg'
	]
}

export default combineReducers({categories, posts, comments, avatars});