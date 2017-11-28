import { createStore, applyMiddleware, compose} from 'redux'; 
import thunk from 'redux-thunk'; 
import postsReducer from '../reducers/posts';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore( 
	postsReducer, 
	composeEnhancers(
		applyMiddleware(thunk)
	)
);

export default store;