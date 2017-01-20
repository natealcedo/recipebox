import { combineReducers } from 'redux';

const recipe = (state = {}, action) => {
	switch (action.type) {
	case 'ADD_RECIPE':
		return {
			recipe: action.recipe,
			ingredients: action.ingredients,
			id: action.id,
			active: false,
			editMode: false
		};
	case 'EDIT_RECIPE': {
		if (state.id === action.id) {
			return {
				...state,
				recipe: action.recipe,
				ingredients: action.ingredients,
				editMode: false
			};
		}
		return state;
	}
	case 'TOGGLE_EDIT_MODE':
		if (state.id === action.id) {
			return {
				...state,
				active: false,
				editMode: !state.editMode
			};
		}
		return {
			...state,
			active: false,
			editMode: false
		};
	case 'TOGGLE_RECIPE':
		if (state.id === action.id) {
			return {
				...state,
				active: !state.active,
				editMode: false,
			};
		}
		return {
			...state,
			active: false,
			editMode: false
		};
	default:
		return state;
	}
};

const recipes = (state = [], action) => {
	switch (action.type) {
	case 'ADD_RECIPE':
		return [...state, recipe(undefined, action)];
	case 'EDIT_RECIPE':
		return state.map(element => recipe(element, action));
	case 'DELETE_RECIPE':
		return state.filter(recipe => recipe.id !== action.id);
	case 'TOGGLE_RECIPE':
		return state.map(element => recipe(element, action));
	case 'TOGGLE_EDIT_MODE':
		return state.map(element => recipe(element, action));
	default:
		return state;
	}
};

const reducer = combineReducers({ recipes });

export { recipes };
export default reducer;

