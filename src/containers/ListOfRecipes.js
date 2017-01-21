import React from 'react';
import { connect } from 'react-redux';
import Recipe from '../components/Recipe';
import { toggleRecipe, toggleEditMode, deleteRecipe, editRecipe } from '../actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' ;

let ListOfRecipes = ({recipes, onDeleteClick, deleteRecipe, onEditClick, onRecipeClick, onEditSubmit}) => {
	let mappedRecipes = recipes.map(el => {
		return <Recipe 
			onEditSubmit={onEditSubmit}
			onDeleteClick={onDeleteClick} 
			onEditClick={onEditClick} 
			onRecipeClick={onRecipeClick} 
			editMode={el.editMode} 
			active={el.active} 
			key={el.id} 
			recipe={el}>
		</Recipe>;
	});
	return (
		<ul className='list'>
		<ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          {mappedRecipes}
        </ReactCSSTransitionGroup>
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
			dispatch(toggleEditMode(id));
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