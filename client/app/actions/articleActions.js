import axios from 'axios';

export function createArticle(article){
	return dispatch => {
		return axios.post('http://localhost:3000/articles/post', article);
	};
}