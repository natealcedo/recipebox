import React from 'react';
import AddRecipe from '../containers/AddRecipe';
import AddRecipeModal from '../containers/AddRecipeModal';
import ListOfRecipes from '../containers/ListOfRecipes';
import '../css/App.css';

const App = () => {
	return (
		<div>
			<div className='App'>
				<h1>List Of Recipes</h1>
				<ListOfRecipes></ListOfRecipes>
				<AddRecipe></AddRecipe>
			</div>
			<AddRecipeModal></AddRecipeModal>
		</div>
	);
};
export default App;