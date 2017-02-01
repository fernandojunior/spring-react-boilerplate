/* @flow */
import { actionTypes } from './actions';

import type { Role} from '../../types';

type AuthState = {
  signedIn: boolean,
  roles: Role[]
};

function authReducer(state : AuthState = { signedIn: false, roles: [] }, action : Object) : AuthState {
  switch (action.type) {
    case actionTypes.LOG_IN:
      return Object.assign({}, state, {
        signedIn: action.auth.signedIn,
        roles: action.auth.roles
      });

    case actionTypes.LOG_OUT:
      return Object.assign({}, state, {
        signedIn: false,
        roles: ['ROLE_ANONYMOUS']
      });

    default:
      return state;
  }
}

export default authReducer;
