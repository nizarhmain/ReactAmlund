import axios from 'axios';


export function createArticle(article){
	return dispatch => {
		return axios.post('http://localhost:3000/articles/post', article);
	};
}

export function fetchArticles(){
	return dispatch => {
		fetch('http://localhost:3000/articles/all')
		.then(res => res.json())
      	.then(data => dispatch(setArticles(data.articles)));
	}
}

export function setArticles(articles){
	return {
		type: 'SET_ARTICLES',
		articles
	}
}