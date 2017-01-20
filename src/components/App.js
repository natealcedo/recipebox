import React from 'react';
import AddRecipe from '../containers/AddRecipe';
import AddRecipeModal from '../containers/AddRecipeModal';
import ListOfRecipes from '../containers/ListOfRecipes';
import '../css/App.css';

const App = () => {
	return (
		<div>
			<div className='App'>
				<nav >
					<h1>Add Recipes</h1>
					<AddRecipe></AddRecipe>
				</nav>
				<ListOfRecipes></ListOfRecipes>
			</div>
			<AddRecipeModal></AddRecipeModal>
		</div>
	);
};
export default App;