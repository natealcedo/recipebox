import React from 'react';
import RecipeEdit from './RecipeEdit';

const Recipe = ({onEditClick, onDeleteClick, editMode, onEditSubmit, onRecipeClick, recipe, active}) => {
	let ingredients = recipe.ingredients.join(', ');
	if (editMode) {
		return (
			<RecipeEdit recipe={recipe} id={recipe.id} onEditClick={onEditClick} onEditSubmit={onEditSubmit}></RecipeEdit>
		);
	}
	return (

		<div className='bg-primary' >
			<li
				onClick={e => {
					e.preventDefault();
					onRecipeClick(recipe.id);
				}}>
				<span>
					<label>
						Recipe: {recipe.recipe}
					</label>
					<br />
					<label>
						Ingredients: {ingredients}
					</label>
				</span>
			</li>
				{
					// Render buttons if active, if not, show plain list items
					(() => {
						if (active) {
							return (
								<div className='button-group'>
									<button onClick={(e) => {
										e.preventDefault();
										onEditClick(recipe.id);
									} } className='btn btn-success'>Edit</button>
									<button onClick={(e)=>{
										e.preventDefault();
										onDeleteClick(recipe.id);
									}}className='btn btn-danger'>Delete</button>
								</div>
							);
						}
					})()
				}
		</div>
	);
};


export default Recipe;

// <button className='btn btn-default'>Edit</button>
// 	<button className='btn btn-danger'>Delete</button>