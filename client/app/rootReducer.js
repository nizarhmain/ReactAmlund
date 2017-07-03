import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import authen from './reducers/authen';
import articles from './reducers/articles';



export default combineReducers({
	flashMessages,
	authen,
	articles
})