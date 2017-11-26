import { createStore, applyMiddleware, compose} from 'redux'; 
import thunk from 'redux-thunk'; 
import indexReducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore( 
	indexReducer, 
	composeEnhancers(
		applyMiddleware(thunk)
	)
);

export default store;