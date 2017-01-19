# FreeCodeCamp: Build a recipe box

Instead of using codepen to do this challenge, I believed that it would be better to implement
this application using the create react app in conjunction with redux.

## Actions 

### Action Types

- ADD_RECIPE
- DELETE_RECIPE
- EDIT_RECIPE
- TOGGLE_RECIPE

#### UI state

Toggle Recipe: Maybe add a dumb component to every recipe that has a class of hidden. Upon
clicking of the component render the component with the data.

Edit Recipe: Use the same form component that add recipe uses. 
Instead of submitting a form which adds a recipe, edit the currently selected.

#### Logic for Toggle recipe
	containers
	    onClickOfRecipe = (id) => {
	    	(recipes) => {
	    		return recipes.map(recipe => {
	    			if(recipe.id !== id){
	    				return {
	    					...recipe, {editing: false}
	    				}
	    			}
	    			return {
	    				...recipe, editing: !editing
	    			}
	    		})
	    	}
	    }

## Model of state of the Application

    state = {
    	recipes = [] type: Array of Recipes
    }
    
    Model of Recipe = {
    	ingredients: [] type: Array of ingredients,
		editMode = bool type: condition whether to render an edititing view,
		editing: false
    }

## Reducers

### Single recipe reducer
	recipe = (state = {}, action) => {
		switch(action.type){
		case 'ADD_RECIPE':
			return {
				name: action.name,
				ingredients: action.ingredients
			}
		case 'EDIT_RECIPE':
			return {
				name: action.name, 
				ingredients: action.ingredients
			}
		case 'SHOW_RECIPE':
			return {

			}
		default: 
			return state
		}
	}

### Multiple Recipe Reducer

	recipes = (state = [], action) => {
		switch(action.type){
			case 'ADD_RECIPE':
				return [...state, recipe(undefined, action)]
			case 'EDIT_RECIPE':
				return [...state, recipe(undefined, action)]
			case 'DELETE_RECIPE':
				return state.filter(recipe => recipe.id !== action.id)
			default: 
				return state
		}
	}

## Tests

The tests associated with the redux store can be found in 
> recipe-box/src/tests


