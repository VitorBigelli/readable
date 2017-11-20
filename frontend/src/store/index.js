import { createStore, applyMiddleware, compose } from 'redux'; 
import thunk from 'redux-thunk'; 
import indexReducer from '../reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && compose

const store = createStore( 
	indexReducer, 
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
)

export default store;