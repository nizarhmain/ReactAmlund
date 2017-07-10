import axios from 'axios';


export function createArticle(article){
	return dispatch => {
		return axios.post('http://localhost:3000/articles/post', article)
	};
}

export function updateArticle(article){
	return dispatch => {
		return axios.put('http://localhost:3000/articles/post/update', article)
	}
}

export function fetchArticles(page){
	return dispatch => {
		return fetch('http://localhost:3000/articles/all/' + page)
		.then(res => res.json())
      	.then((data) => { 
				dispatch(setArticles(data.articles));
				dispatch(setPages(data.pages, page));
		});
	}
}

export function fetchPublishedArticles(page){
	return dispatch => {
		return fetch('http://localhost:3000/articles/published/' + page)
		.then(res => res.json())
      	.then((data) => { 
				dispatch(setArticles(data.articles));
				dispatch(setPages(data.pages, page));
		});
	}
}

export function setPages(pages, page){
	return {
		type: 'SET_PAGES',
		pages,
		page
	}
}


export function setArticles(articles){
	return {
		type: 'SET_ARTICLES',
		articles
	}
}


export function articleDeleted(articleId) {
  return {
    type: 'ARTICLE_DELETED',
    articleId
  }
}


export function deleteArticle(id){
	return dispatch => {	
		return axios.delete('http://localhost:3000/articles/post/' + id)
		.then(data => dispatch(articleDeleted(id)));
	}
}

export function publishArticle(id){	
	return dispatch => {	
		return axios.put('http://localhost:3000/articles/post/publish/' + id);

	}
}

export function hideArticle(id){
	return dispatch => {	
		return axios.put('http://localhost:3000/articles/post/hide/' + id);

	}
}