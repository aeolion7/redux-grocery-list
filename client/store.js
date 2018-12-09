import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';

const ADD_GROCERY = 'ADD_GROCERY';
const TOGGLE_GROCERY = 'TOGGLE_GROCERY';

let nextId = 0;
export const addGrocery = text => ({
  type: ADD_GROCERY,
  id: nextId++,
  text,
});

export const toggleGrocery = groceryId => ({
  type: TOGGLE_GROCERY,
  id: groceryId,
});

const initialState = {
  groceries: [],
};

const groceryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GROCERY:
      const newGrocery = {
        bought: false,
        id: action.id,
        text: action.text,
      };
      return { ...state, groceries: [...state.groceries, newGrocery] };
    case TOGGLE_GROCERY:
      return {
        ...state,
        groceries: state.groceries.map(grocery => {
          return grocery.id === action.id
            ? { ...grocery, bought: !grocery.bought }
            : grocery;
        }),
      };
    default:
      return state;
  }
};

const store = createStore(groceryReducer, applyMiddleware(loggerMiddleware));

export default store;
