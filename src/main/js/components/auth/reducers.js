/* @flow */
import { actionTypes } from './actions';

import type { Action, Role, AuthState } from '../../types';

function authReducer(state : AuthState = { signedIn: false, roles: [] }, action : Action) : AuthState {
  switch (action.type) {
    case actionTypes.LOGGED_IN:
      return Object.assign({}, state, {
        signedIn: action.auth.signedIn,
        roles: action.auth.roles
      });

    case actionTypes.LOGGED_OUT:
      return Object.assign({}, state, {
        signedIn: false,
        roles: ['ROLE_ANONYMOUS']
      });

    default:
      return state;
  }
}

export default authReducer;
