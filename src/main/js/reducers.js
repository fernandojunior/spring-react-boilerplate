/* @flow */
import { combineReducers } from 'redux';
import authReducer from './components/auth/reducers';
import commentReducer from './components/comment/reducers';

function errorsReducer(state = {} /* , action */) {
  return state;
}

/* Combine the application's reducers */
const reducer = combineReducers(Object.assign({}, {
  auth: authReducer,
  comments: commentReducer,
  errors: errorsReducer
}));

export default reducer;
