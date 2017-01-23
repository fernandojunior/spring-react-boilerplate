/* @flow */
import { AUTHENTICATED, LOGGED_OUT } from './actions';

import type { Action, Role } from '../../types';

type AuthState = {
  signedIn: boolean,
  roles: Role[]
};

function authReducer(state : AuthState = { signedIn: false, roles: [] }, action : Action) : AuthState {
  switch (action.type) {
    case AUTHENTICATED:
      return Object.assign({}, state, {
        signedIn: true,
        roles: action.roles
      });

    case LOGGED_OUT:
      return Object.assign({}, state, {
        signedIn: false,
        roles: ['ROLE_ANONYMOUS']
      });

    default:
      return state;
  }
}

export default authReducer;
