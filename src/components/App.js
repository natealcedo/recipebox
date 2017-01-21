import React from 'react';
import AddRecipe from '../containers/AddRecipe';
import AddRecipeModal from '../containers/AddRecipeModal';
import ListOfRecipes from '../containers/ListOfRecipes';
import '../css/App.css';

const App = () => {
	return (
		<div className='App'>
			<AddRecipeModal></AddRecipeModal>
			<AddRecipe></AddRecipe>
			<ListOfRecipes></ListOfRecipes>
		</div>
	);
};
export default App;