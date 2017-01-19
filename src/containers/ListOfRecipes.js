import React from 'react';
import {connect} from 'react-redux';
import Recipe from '../components/Recipe';
import {toggleRecipe} from '../actions';
import '../css/ListOfRecipes.css';
let ListOfRecipes =  ({recipes, onRecipeClick}) => {
	let mappedRecipes = recipes.map(el => (
		<Recipe onRecipeClick={onRecipeClick} key={el.id} recipe={el}></Recipe>
	));
	return (
		<ul>
			{mappedRecipes}
		</ul>
	);
};

const mapStateToProps = (state) => {
	return{
		recipes: state.recipes
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onRecipeClick: (id) => {
			dispatch(toggleRecipe(id));
		}
	};	
};

ListOfRecipes = connect(mapStateToProps, mapDispatchToProps)(ListOfRecipes);

export default ListOfRecipes;