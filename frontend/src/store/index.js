import { createStore, applyMiddleware, compose} from 'redux'; 
import thunk from 'redux-thunk'; 
import reducers from '../reducers/index';
import { combineReducers } from 'redux';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const postStore = createStore( 
	reducers, 
	composeEnhancers(
		applyMiddleware(thunk)
	)
);

export default postStore;