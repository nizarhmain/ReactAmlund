import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import authen from './reducers/authen';


export default combineReducers({
	flashMessages,
	authen
})