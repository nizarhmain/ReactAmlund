
export default function articles(state = [], action = {}){
	switch(action.type){

		case 'SET_ARTICLES':
			return action.articles;

		case 'ARTICLE_DELETED':
      		return state.filter(article => article._id !== action.articleId);

      	case 'ARTICLE_FETCHED':
	    		return state.filter(article => article._id === action.article._id);
	    		



		default: return state;
	}
}
