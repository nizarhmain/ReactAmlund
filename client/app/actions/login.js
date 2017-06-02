import axios from 'axios';


export function setCurrentUser(user){
	return {
		type: 'SET_CURRENT_USER',
		user
	};
}



 export function login(data){
 	return dispatch => {
 		return axios.post('http://localhost:3000/users/authenticate', data);
 	}

 }