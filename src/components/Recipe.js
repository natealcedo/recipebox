import React from 'react';

const Recipe = ({onRecipeClick, recipe}) => {
	let ingredients = recipe.ingredients.join(', ');
	return (
		<li 
		className='bg-primary'
		onClick={e => {
			e.preventDefault();
			onRecipeClick(recipe.id);
		}}>
			<p>
				Recipe: {recipe.recipe}
				<br/>
				Ingredients: {ingredients}
			</p>
		</li>
	);
};

export default Recipe;