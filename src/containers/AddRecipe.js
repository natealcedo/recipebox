import React from 'react';
import '../css/AddRecipeModal.css';

const AddRecipe = () => {
	const showModal = () => {
		console.log('button Clicked!');
		let root = document.getElementById('root');
		root.classList.toggle('overlay');
	};
	return (
		<div className="form-group">
			<button onClick={showModal}className='btn btn-default'> Add Recipe</button>
		</div>
	);
};

// const mapDispatchToProps = () => {
// 	return {

// 	};
// };

export default AddRecipe;