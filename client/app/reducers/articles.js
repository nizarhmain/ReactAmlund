
export default function articles(state = [], action = {}){
	switch(action.type){

		case 'SET_ARTICLES':
			return action.articles;
			
		case 'ARTICLE_DELETED':
      		return state.filter(article => article._id !== action.articleId);

		default: return state;
	}
}
