
export default function articles(state = [], action = {}){
	switch(action.type){

		case 'SET_ARTICLES':
			return action.articles;


		default: return state;
	}
}
