import * as actions from '../actions';

describe('Action Creators', () => {

	it('should create an action to add a recipe', () => {
		const expectedAction = {
			type: actions.ADD_RECIPE,
			recipe: 'one egg',
			ingredients: ['one egg', 'some egg white', 'one egg yolk'],
			id: 0
		};
		expect(actions.addRecipe('one egg', 'one egg, some egg white, one egg yolk')).toEqual(expectedAction);
	});

	it('should create an action to edit a current recipe', () => {
		const expectedAction = {
			type: actions.EDIT_RECIPE,
			recipe: 'two eggs',
			ingredients: ['no egg white', 'one egg yolk'],
			id: 1
		};
		expect(actions.editRecipe('two eggs', 'no egg white, one egg yolk', 1)).toEqual(expectedAction);
	});

	it('should create an action to delete a recipe', () => {
		const expectedAction = {
			type: actions.DELETE_RECIPE,
			id: 0
		};
		expect(actions.deleteRecipe(0)).toEqual(expectedAction);
	});
});