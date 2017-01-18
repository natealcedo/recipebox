// import 'babel-polyfill';
import * as reducers from '../reducers';

describe('Reducers', () => {
	it('should return the initial state', () => {
		expect(reducers.recipes(undefined, 'random event'))
			.toEqual([]);
	});

	it('should be able to handle an addTodo action', () => {
		let expectedState = [{
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 0
		}];
		expect(expectedState).toEqual(reducers.recipes([], {
			type: 'ADD_RECIPE',
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 0
		}));

	});

	it('should be able to handle an addTodo action when there is a current state', () => {
		let initialState = [{
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 0
		}, {
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 1
		}];

		let expectedState = [{
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 0
		}, {
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 1
		}, {
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 2
		}];

		expect(expectedState).toEqual(reducers.recipes(initialState, {
			type: 'ADD_RECIPE',
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 2
		}));
	});

	it('should be able to handle a deleteRecipe action', () => {
		let initialState = [{
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 0
		},
		{
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 1
		},
		{
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 2
		}];

		let expectedState = [{
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 0
		}, {
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 2
		}];
		expect(reducers.recipes(initialState, {
			type: 'DELETE_RECIPE',
			id: 1
		})).toEqual(expectedState);
	});

	it('should be able to handle an editRecipe action', () => {
		let initialState = [{
			recipe: 'test',
			ingredients: ['testing', 'testing'],
			id: 2
		}];

		expect(reducers.recipes(initialState, {
			type: 'EDIT_RECIPE',
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 2
		})).toEqual([{
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 2
		}]);
	});

	it('should be able to handle an editRecipe action with more than one recipe', () => {
		let initialState = [{
			recipe: 'test',
			ingredients: ['testing', 'testing'],
			id: 2
		},{
			recipe: 'test',
			ingredients: ['testing', 'testing'],
			id: 3
		}];

		expect(reducers.recipes(initialState, {
			type: 'EDIT_RECIPE',
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 2
		})).toEqual([{
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 2
		},
		{
			recipe: 'test',
			ingredients: ['testing', 'testing'],
			id: 3
		}]);
	});
});
