export default function pagination(state = [], action = {}){
	switch(action.type){

		case 'SET_PAGE':
			return action.pages;
			

		default: return state;
	}
}
