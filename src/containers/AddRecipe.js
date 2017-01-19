import React from 'react';
import '../css/AddRecipeModal.css';

const AddRecipe = () => {
	const showModal = () => {
		document.getElementsByClassName('Modal')[0].classList.add('show');
	};
	return (
		<div className="form-group">
			<button onClick={showModal}className='btn btn-default'> Add Recipe</button>
		</div>
	);
};

export default AddRecipe;