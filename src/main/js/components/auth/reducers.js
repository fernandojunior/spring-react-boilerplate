/* @flow */
import { ACTION_TYPES } from './actions';

import type { Action, Role } from '../../types';

type AuthState = {
  signedIn: boolean,
  roles: Role[]
};

function authReducer(state : AuthState = { signedIn: false, roles: [] }, action : Action) : AuthState {
  switch (action.type) {
    case ACTION_TYPES.LOGGED_IN:
      return Object.assign({}, state, {
        signedIn: true,
        roles: action.roles
      });

    case ACTION_TYPES.LOGGED_OUT:
      return Object.assign({}, state, {
        signedIn: false,
        roles: ['ROLE_ANONYMOUS']
      });

    default:
      return state;
  }
}

export default authReducer;
