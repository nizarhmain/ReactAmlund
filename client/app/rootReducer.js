import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import authen from './reducers/authen';
import articles from './reducers/articles';
import { reducer as formReducer } from 'redux-form'



export default combineReducers({
	formReducer,
	flashMessages,
	authen,
	articles
})