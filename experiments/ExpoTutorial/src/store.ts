import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { State, initialState, Action, reducer } from './model';

function reducerWithInitialState(
  state: undefined | State,
  action: Action,
): State {
  return state ? reducer(state, action) : initialState;
}

export default createStore(reducerWithInitialState, applyMiddleware(thunk));
