export default function pagination(state = [], action = {}){
	switch(action.type){

		case 'SET_PAGES':
			return {
				currentPage:  action.page,
				pages: action.pages
			};

		default: return state ;
	}
}
