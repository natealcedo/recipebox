import React from 'react';

const AddRecipe = () => {
	const showModal = () => {
		document.getElementsByClassName('Modal')[0].classList.add('show');
	};
	return (
		<nav>
			<h1>List Of Recipes</h1>
			<div className="form-group">
				<button onClick={showModal} className='btn btn-default'> Add Recipe</button>
			</div>
		</nav>
	);
};

export default AddRecipe;