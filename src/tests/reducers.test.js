import * as reducers from '../reducers';

describe('Reducers', () => {
	it('should return the initial state', () => {
		expect(reducers.recipes(undefined, 'UNDEFINED'))
			.toEqual([]);
	});

	it('should be able to handle an ADD_RECIPE action', () => {
		let expectedState = [{
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 0,
			active: false,
			editMode: false
		}];
		expect(expectedState).toEqual(reducers.recipes([], {
			type: 'ADD_RECIPE',
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 0
		}));

	});

	it('should be able to handle an ADD_RECIPE action when there is a current state', () => {
		let initialState = [{
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 1,
			active: false,
			editMode: false
		}];

		let expectedState = [{
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 1,
			active: false,
			editMode: false
		},
		{
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 2,
			active: false,
			editMode: false
		}];
	});

	it('should be able to handle a DELETE_RECIPE action', () => {
		let initialState = [{
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 0,
			active: false,
			editMode: false
		},
		{
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 1,
			active: false,
			editMode: true
		},
		{
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 2,
			active: false,
			editMode: false
		}];

		let expectedState = [{
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 0,
			active: false,
			editMode: false
		}, {
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 2,
			active: false,
			editMode: false
		}];

		expect(reducers.recipes(initialState, {
			type: 'DELETE_RECIPE',
			id: 1
		})).toEqual(expectedState);
	});

	it('should be able to handle an EDIT_RECIPE action', () => {
		let initialState = [{
			recipe: 'test',
			ingredients: ['testing', 'testing'],
			id: 2,
			editMode: true,
			active: false
		}];

		expect(reducers.recipes(initialState, {
			type: 'EDIT_RECIPE',
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 2
		})).toEqual([{
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 2,
			editMode: false,
			active: false
		}]);
	});

	it('should be able to handle an EDIT_RECIPE action with more than one recipe', () => {
		let initialState = [{
			recipe: 'test',
			ingredients: ['testing', 'testing'],
			editMode: true,
			active: false,
			id: 2
		}, {
			recipe: 'test',
			ingredients: ['testing', 'testing'],
			id: 3,
			editMode: false,
			active: false
		}];

		expect(reducers.recipes(initialState, {
			type: 'EDIT_RECIPE',
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 2
		})).toEqual([{
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 2,
			editMode: false,
			active: false
		},
		{
			recipe: 'test',
			ingredients: ['testing', 'testing'],
			id: 3,
			editMode: false,
			active: false
		}]);
	});

	it('should be able to toggle a single recipe to active and inactive', () => {
		let initialState = [{
			recipe: 'egg',
			ingredients: [],
			id: 1,
			active: false,
			editMode: false
		}];
		let expectedState = [{
			recipe: 'egg',
			ingredients: [],
			id: 1,
			editMode: false,
			active: true
		}];

		expect(reducers.recipes(initialState, { type: 'TOGGLE_RECIPE', id: 1 })).toEqual(expectedState);
		expect(reducers.recipes(expectedState, { type: 'TOGGLE_RECIPE', id: 1 })).toEqual(initialState);

	});

	it('should toggle an active recipe to false when another recipe is toggled', () => {
		let initialState = [{
			recipe: 'egg',
			ingredients: [],
			id: 0,
			active: true,
			editMode: false
		},
		{
			recipe: 'egg',
			ingredients: [],
			id: 1,
			active: false,
			editMode: false
		},
		{
			recipe: 'egg',
			ingredients: [],
			id: 2,
			active: false,
			editMode: false
		}];

		let expectedState = [{
			recipe: 'egg',
			ingredients: [],
			id: 0,
			active: false,
			editMode: false
		},
		{
			recipe: 'egg',
			ingredients: [],
			id: 1,
			active: false,
			editMode: false
		},
		{
			recipe: 'egg',
			ingredients: [],
			id: 2,
			active: true,
			editMode: false
		}];

		let numberOfActiveRecipes =
			reducers.recipes(initialState, { type: 'TOGGLE_RECIPE', id: 2 }).reduce((prev, curr) => {
				if (curr.active) {
					return prev + 1;
				}
				return prev;
			}, 0);


		expect(expectedState).toEqual(reducers.recipes(initialState, { type: 'TOGGLE_RECIPE', id: 2 }));
		expect(numberOfActiveRecipes).toEqual(1);
	});

	it('should set editing mode of all other recipes to false when a recipe is set to active', () => {
		let initialState = [{
			recipe: 'egg',
			ingredients: [],
			id: 0,
			active: false,
			editMode: false
		}, {
			recipe: 'egg',
			ingredients: [],
			id: 1,
			active: true,
			editMode: false
		},
		{
			recipe: 'egg',
			ingredients: [],
			id: 2,
			active: false,
			editMode: false
		}];


		let expectedState = [{
			recipe: 'egg',
			ingredients: [],
			id: 0,
			active: false,
			editMode: false
		}, {
			recipe: 'egg',
			ingredients: [],
			id: 1,
			active: false,
			editMode: false
		},
		{
			recipe: 'egg',
			ingredients: [],
			id: 2,
			active: true,
			editMode: false
		}];


		let numberOfActiveRecipes =
			reducers.recipes(initialState, { type: 'TOGGLE_RECIPE', id: 2 }).reduce((prev, curr) => {
				if (curr.active) {
					return prev + 1;
				}
				return prev;
			}, 0);

		expect(expectedState).toEqual(reducers.recipes(initialState, { type: 'TOGGLE_RECIPE', id: 2 }));
		expect(numberOfActiveRecipes).toEqual(1);
	});

	it('should toggle the editing state of a single recipe', () => {
		let initialState = [{
			recipe: 'egg',
			ingredients: [],
			id: 0,
			active: false,
			editMode: false
		}];

		let expectedState = [{
			recipe: 'egg',
			ingredients: [],
			id: 0,
			active: false,
			editMode: true
		}];

		expect(reducers.recipes(initialState, {
			type: 'TOGGLE_EDIT_MODE',
			id: 0
		})).toEqual(expectedState);

		expect(reducers.recipes(expectedState, {
			type: 'TOGGLE_EDIT_MODE',
			id: 0
		})).toEqual(initialState);
	});


	it('should toggle the active state of all recipes to false when editing mode is active for any recipes', () => {
		let initialState = [{
			recipe: 'egg',
			ingredients: [],
			id: 0,
			active: false,
			editMode: false
		}, {
			recipe: 'egg',
			ingredients: [],
			id: 1,
			active: true,
			editMode: false
		},
		{
			recipe: 'egg',
			ingredients: [],
			id: 2,
			active: false,
			editMode: false
		}];

		let expectedState = [{
			recipe: 'egg',
			ingredients: [],
			id: 0,
			active: false,
			editMode: false
		}, {
			recipe: 'egg',
			ingredients: [],
			id: 1,
			active: false,
			editMode: false
		},
		{
			recipe: 'egg',
			ingredients: [],
			id: 2,
			active: false,
			editMode: true
		}];
		expect(expectedState).toEqual(reducers.recipes(initialState, {
			type: 'TOGGLE_EDIT_MODE',
			id: 2
		}));
	});

	it('should toggle editing mode of a recipe to false after submitting the edit', () => {
		let initialState = [{
			recipe: 'egg',
			ingredients: [],
			id: 0,
			active: false,
			editMode: true
		}];

		let expectedState = [{
			recipe: 'Proper food',
			ingredients: ['cool', 'story', 'bro'],
			id: 0,
			active: false,
			editMode: false
		}];

		expect(reducers.recipes(initialState, {
			type: 'EDIT_RECIPE',
			recipe: 'Proper food',
			ingredients: ['cool', 'story', 'bro'],
			id: 0
		})).toEqual(expectedState);

	});

});
