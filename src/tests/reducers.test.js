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
			editing_mode: false
		}];
		expect(expectedState).toEqual(reducers.recipes([], {
			type: 'ADD_RECIPE',
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 0,
			active: false,
			editing_mode: false
		}));

	});

	it('should be able to handle an ADD_RECIPE action when there is a current state', () => {
		let initialState = [{
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 0,
			active: false,
			editing_mode: false
		}, {
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 1,
			active: false,
			editing_mode: false
		}];

		let expectedState = [{
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 0,
			active: false,
			editing_mode: false
		}, {
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 1,
			active: false,
			editing_mode: false
		}, {
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 2,
			active: false,
			editing_mode: false
		}];

		expect(expectedState).toEqual(reducers.recipes(initialState, {
			type: 'ADD_RECIPE',
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 2,
			active: false,
			editing_mode: false
		}));
	});

	it('should be able to handle a DELETE_RECIPE action', () => {
		let initialState = [{
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 0,
			active: false
		},
		{
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 1,
			active: false
		},
		{
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 2,
			active: false
		}];

		let expectedState = [{
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 0,
			active: false
		}, {
			recipe: 'hotdog',
			ingredients: ['bread', 'hotdog'],
			id: 2,
			active: false
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

	it('should be able to handle an EDIT_RECIPE action with more than one recipe', () => {
		let initialState = [{
			recipe: 'test',
			ingredients: ['testing', 'testing'],
			id: 2
		}, {
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

	it('should be able to toggle a single recipe to active and inactive', () => {
		let initialState = [{
			recipe: 'egg',
			ingredients: [],
			id: 1,
			active: false
		}];
		let expectedState = [{
			recipe: 'egg',
			ingredients: [],
			id: 1,
			active: true
		}];

		expect(reducers.recipes(initialState, { type: 'TOGGLE_RECIPE', id: 1 })).toEqual(expectedState);
		expect(reducers.recipes(expectedState, { type: 'TOGGLE_RECIPE', id: 1 })).toEqual(initialState);

	});

	it('should only toggle one recipe when there there are many recipes', () => {
		let initialState = [{
			recipe: 'egg',
			ingredients: [],
			id: 0,
			active: false
		}, {
			recipe: 'egg',
			ingredients: [],
			id: 1,
			active: false
		}, {
			recipe: 'egg',
			ingredients: [],
			id: 2,
			active: false
		}];

		let expectedState = [{
			recipe: 'egg',
			ingredients: [],
			id: 0,
			active: false
		}, {
			recipe: 'egg',
			ingredients: [],
			id: 1,
			active: false
		}, {
			recipe: 'egg',
			ingredients: [],
			id: 2,
			active: true
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

	it('should toggle an active recipe to false when another recipe is toggled', () => {
		let initialState = [{
			recipe: 'egg',
			ingredients: [],
			id: 0,
			active: false,

		}, {
			recipe: 'egg',
			ingredients: [],
			id: 1,
			active: true
		}, {
			recipe: 'egg',
			ingredients: [],
			id: 2,
			active: false
		}];

		let expectedState = [{
			recipe: 'egg',
			ingredients: [],
			id: 0,
			active: false
		}, {
			recipe: 'egg',
			ingredients: [],
			id: 1,
			active: false
		}, {
			recipe: 'egg',
			ingredients: [],
			id: 2,
			active: true
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
			editing_mode: false
		}];

		let expectedState = [{
			recipe: 'egg',
			ingredients: [],
			id: 0,
			active: false,
			editing_mode: true
		}];

		expect(reducers.recipes(initialState, {
			type: 'SET_EDIT_MODE',
			id: 0
		})).toEqual(expectedState);
		expect(reducers.recipes(expectedState, {
			type: 'SET_EDIT_MODE',
			id: 0
		})).toEqual(initialState);
	});

	it('should toggle the editing state of a recipe to active and at the same time toggle the edit state of another recipe to false', () => {
		let initialState = [{
			recipe: 'egg',
			ingredients: [],
			id: 0,
			active: false,
			editing_mode: false
		}, {
			recipe: 'egg',
			ingredients: [],
			id: 1,
			active: false,
			editing_mode: true
		},
		{
			recipe: 'egg',
			ingredients: [],
			id: 2,
			active: false,
			editing_mode: false
		}];

		let expectedState = [{
			recipe: 'egg',
			ingredients: [],
			id: 0,
			active: false,
			editing_mode: false
		}, {
			recipe: 'egg',
			ingredients: [],
			id: 1,
			active: false,
			editing_mode: false
		},
		{
			recipe: 'egg',
			ingredients: [],
			id: 2,
			active: false,
			editing_mode: true
		}];

		expect(expectedState).toEqual(reducers.recipes(initialState, {
			type: 'SET_EDIT_MODE',
			id: 2
		}));
	});

	it('should toggle the active state of all recipes to false when editing mode is active for any recipes', () => {
		let initialState = [{
			recipe: 'egg',
			ingredients: [],
			id: 0,
			active: false,
			editing_mode: false
		}, {
			recipe: 'egg',
			ingredients: [],
			id: 1,
			active: true,
			editing_mode: false
		},
		{
			recipe: 'egg',
			ingredients: [],
			id: 2,
			active: false,
			editing_mode: false
		}];

		let expectedState = [{
			recipe: 'egg',
			ingredients: [],
			id: 0,
			active: false,
			editing_mode: false
		}, {
			recipe: 'egg',
			ingredients: [],
			id: 1,
			active: false,
			editing_mode: false
		},
		{
			recipe: 'egg',
			ingredients: [],
			id: 2,
			active: false,
			editing_mode: true
		}];
		expect(expectedState).toEqual(reducers.recipes(initialState, {
			type: 'SET_EDIT_MODE',
			id: 2
		}));

	});
});
