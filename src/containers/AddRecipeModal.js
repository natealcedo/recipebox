import React from 'react';
import { connect } from 'react-redux';
import { addRecipe } from '../actions';



let AddRecipeModal = ({onClick}) => {
	/**
	 * Reference for input values and notifications
	 */
	let recipe;
	let ingredients;
	let recipeNotification;
	let ingredientsNotification;

	let validateForm = (e) => {
		// Ensure form is not empty
		e.preventDefault();
		if (!recipe.value) {
			recipeNotification.innerHTML = 'Value Required';
		}
		if (recipe.value) {
			recipeNotification.innerHTML = ' ';
		}
		if (!ingredients.value) {
			ingredientsNotification.innerHTML = 'Value Required';
			return;
		}
		if (ingredients.value) {
			ingredientsNotification.innerHTML = ' ';
		}

		if (!recipe.value || !ingredients.value) {
			return;
		}
		onClick(recipe.value, ingredients.value.trim());
		recipe.value = null;
		ingredients.value = null;
	};
	return (
		<div className='Modal'>
			<form>
				<label>Recipe</label>
				<input className='form-control' type='text' label='Recipe' placeholder='Recipe Name' ref={ref => { recipe = ref; } } />
				<label className='notification' ref={ref => recipeNotification = ref}></label>
				<br />
				<label>Ingredients</label>
				<input className='form-control' type='textarea' label='Ingredients' placeholder='Enter Ingredients,Separated,By Commas' ref={ref => { ingredients = ref; } } />
				<label className='notification' ref={ref => ingredientsNotification = ref}></label>
				<br />
				<button type='submit' className='btn btn-primary' onClick={(e) => {
					validateForm(e);
				}}>Submit</button>
				<button onClick={(e) => {
					e.preventDefault();
					document.getElementsByClassName('Modal')[0].classList.remove('show');
				} } className='btn btn-danger'>Close</button>
			</form>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		onClick: (recipe, ingredients) => {
			dispatch(addRecipe(recipe, ingredients));
		}
	};
};

AddRecipeModal = connect(null, mapDispatchToProps)(AddRecipeModal);
export default AddRecipeModal;