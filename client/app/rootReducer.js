import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import authen from './reducers/authen';
import articles from './reducers/articles';
import pagination from './reducers/pagination';



export default combineReducers({
	flashMessages,
	authen,
	articles,
	pagination
})