import { RECEIVE_CATEGORIES } from '../actions/index'; 
import posts from './reducer_posts';
import comments from './reducer_comments';
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