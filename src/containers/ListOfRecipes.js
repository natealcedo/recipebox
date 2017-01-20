import React from 'react';
import { connect } from 'react-redux';
import Recipe from '../components/Recipe';
import { toggleRecipe, setEditMode, deleteRecipe, editRecipe } from '../actions';
import '../css/ListOfRecipes.css';

let ListOfRecipes = ({recipes, onDeleteClick, deleteRecipe, onEditClick, onRecipeClick, onEditSubmit}) => {
	let mappedRecipes = recipes.map(el => {
		return <Recipe 
			onEditSubmit={onEditSubmit}
			onDeleteClick={onDeleteClick} 
			onEditClick={onEditClick} 
			onRecipeClick={onRecipeClick} 
			editMode={el.editMode} 
			active={el.active} key={el.id} 
			recipe={el}>
		</Recipe>;
	});
	return (
		<ul className='list'>
			{mappedRecipes}
		</ul>
	);
};

const mapStateToProps = (state) => {
	return {
		recipes: state.recipes
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onRecipeClick: (id) => {
			dispatch(toggleRecipe(id));
		},
		onEditClick: (id) => {
			dispatch(setEditMode(id));
		},
		onDeleteClick: (id) => {
			dispatch(deleteRecipe(id));
		},
		onEditSubmit: (recipe, ingredients,id) => {
			dispatch(editRecipe(recipe, ingredients, id));
		}
	};
};

ListOfRecipes = connect(mapStateToProps, mapDispatchToProps)(ListOfRecipes);

export default ListOfRecipes;