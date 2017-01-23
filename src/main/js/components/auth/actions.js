/* @flow */

import type { Action, AuthData } from '../../types';

export const AUTHENTICATED = 'AUTHENTICATED';
export const LOGGED_OUT = 'LOGGED_OUT';

export function authenticated(authData : AuthData) : Action {
  return {
    type: AUTHENTICATED,
    roles: authData.roles
  };
}

export function loggedOut() : Action {
  return {
    type: LOGGED_OUT
  };
}
