export const ADD_RECIPE = 'ADD_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const EDIT_RECIPE = 'EDIT_RECIPE';

let id = 0;

const addRecipe = (recipe, ingredients) => {
	return {
		type: ADD_RECIPE,
		recipe,
		ingredients: ingredients.split(',').map(el => el.trim()),
		id: id++
	};
};

const editRecipe = (recipe, ingredients, id) => {
	return {
		type: EDIT_RECIPE,
		recipe,
		ingredients: ingredients.split(',').map(el => el.trim()),
		id
	};
};

const deleteRecipe = (id) => {
	return {
		type: DELETE_RECIPE,
		id
	};
};


export { addRecipe, editRecipe, deleteRecipe };
