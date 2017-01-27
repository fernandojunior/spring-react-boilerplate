/* @flow */
import { combineReducers } from 'redux';
import authReducer from './components/auth/reducers';
import errorsReducer from './components/errors/reducers';
import commentReducer from './components/comment/reducers';

// Combine the application's reducers
const reducer = combineReducers(Object.assign({}, {
  auth: authReducer,
  comments: commentReducer,
  errors: errorsReducer
}));

export default reducer;
