/* @flow */
import axios from 'axios';

import type { Action, AuthData, ThunkAction } from '../../types';

export const ACTION_TYPES = {
  LOGGED_IN: 'LOGGED_IN',
  LOGGED_OUT: 'LOGGED_OUT'
};

export function loggedIn(authData : AuthData) : Action {
  return {
    type: ACTION_TYPES.LOGGED_IN,
    roles: authData.roles
  };
}

export function loggedOut() : Action {
  return {
    type: ACTION_TYPES.LOGGED_OUT
  };
}

export function signIn(username: string, password: string,
                       successCallback: Function,
                       failureCallback: Function) : ThunkAction {
  const data = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
  return dispatch => {
    axios.post('/api/signin', data)
      .then(
        success => {
          dispatch(loggedIn(success.data));
          successCallback(success);
        },
        failure => {
          console.error(failure);
          if (failureCallback)
              failureCallback(failure);
        }
      );
  }
}

export function signOut(successCallback: Function, failureCallback?: Function) : ThunkAction {
  return dispatch => {
    axios.post('/api/signout')
    .then(
      (/* success*/) => {
        dispatch(loggedOut());
        successCallback();
      },
      failure => {
        console.error(`Failed to log out successfully: ${failure}`)
        if (failureCallback)
            failureCallback(failure);
      }
    );
  }
}
