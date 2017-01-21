import React from 'react';


let RecipeEdit = ({onEditSubmit, onEditClick, id, recipe}) => {
	let recipeInput;
	let ingredients;

	const validateForm = (e) => {
		e.preventDefault();
		if (!recipeInput.value) {
			recipeInput.value = 'Value Required';
			return;
		}
		if (!ingredients.value) {
			ingredients.value = 'Value Required';
			return;
		}
		if (!recipeInput.value || !ingredients.value) {
			return;
		}
		onEditSubmit(recipeInput.value, ingredients.value.trim(), id);
	};
	return (
		<div className='bg-primary form-group'>
			<form>
				<label>Recipe </label>
				<input type="text" className='form-control' defaultValue={recipe.recipe} ref={ref => recipeInput = ref} /><br />
				<label>Ingredients </label>
				<input type="text" className='form-control' defaultValue={recipe.ingredients.join(',')} ref={ref => ingredients = ref} /><br />
				<button className='btn btn-info' type="submit" onClick={(e) => {
					validateForm(e);
				}} >Submit</button>
				<button className='btn btn-danger' onClick={(e) => {
					e.preventDefault();
					onEditClick(id);
				}}>Cancel</button>
			</form>
		</div>
	);
};

export default RecipeEdit;


