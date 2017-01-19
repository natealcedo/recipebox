import React from 'react';
import {connect} from 'react-redux';
import {addRecipe} from '../actions';
import '../css/AddRecipeModal.css';

let AddRecipeModal = ({onClick}) => {
	/**
	 * Reference for input values and notifications
	 */
	let recipe;
	let ingredients;
	let recipeNotification;
	let ingredientsNotification;
	return (
		<div>
			<form>
				<label>Recipe</label>
				<input className='form-control' type="text" label="Recipe" placeholder="Recipe Name" ref={ref=> {recipe = ref;}}/>
				<label className='notification' ref={ref=> recipeNotification = ref }></label>
				<br/>
				<label>Ingredients</label>
				<input className='form-control' type="textarea" label="Ingredients" placeholder="Enter Ingredients,Separated,By Commas" ref={ref => {ingredients = ref;}}/>
				<label className='notification'ref={ref=> ingredientsNotification = ref }></label>
				<br/>
				<button type='submit' className='btn btn-primary' onClick={(e)=>{
					e.preventDefault();
					if(!recipe.value){
						recipeNotification.innerHTML = 'Value Required';
					}
					if(recipe.value){
						recipeNotification.innerHTML = null;
					}
					if(!ingredients.value){
						ingredientsNotification.innerHTML = 'Value Required';
						return;
					}
					if(ingredients.value){
						ingredientsNotification.innerHTML = null;
					}

					if(!recipe.value || !ingredients.value){
						return;
					}
					onClick(recipe.value, ingredients.value);
					recipe.value = null;
					ingredients.value = null;

				}}>Add Recipe</button>
				<button className='btn btn-danger'>Close</button>
			</form>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		onClick: (recipe,ingredients) => {
			dispatch(addRecipe(recipe, ingredients));
		}
	};
};

AddRecipeModal = connect(null, mapDispatchToProps)(AddRecipeModal);
export default AddRecipeModal;