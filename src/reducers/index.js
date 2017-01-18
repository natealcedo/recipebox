import { combineReducers } from 'redux';

const recipe = (state = {}, action) => {
	switch (action.type) {
	case 'ADD_RECIPE':
		return {
			recipe: action.recipe,
			ingredients: action.ingredients,
			id: action.id

		};
	case 'EDIT_RECIPE':{
		if(state.id === action.id){
			return {
				...state,
				recipe: action.recipe,
				ingredients: action.ingredients,
			};
		}
		return state;
	}
	default:
		return state;
	}
};

const recipes = (state = [], action) => {
	switch (action.type) {
	case 'ADD_RECIPE':
		return [...state, recipe(undefined, action)];
	case 'EDIT_RECIPE':
		return state.map(el => recipe(el, action));
	case 'DELETE_RECIPE':
		return state.filter(recipe => recipe.id !== action.id);
	default:
		return state;
	}
};

const reducer = combineReducers({ recipes });

export { recipe, recipes };
export default reducer;

