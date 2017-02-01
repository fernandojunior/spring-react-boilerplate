/* @flow */
import type { ThunkAction } from '../../types';

import { authService } from '../../services';

export const actionTypes = {
  LOG_IN: 'LOG_IN',
  LOG_OUT: 'LOG_OUT'
};

export function signIn(username: string, password: string, onSuccess: Function, onError: Function) : ThunkAction {
  return dispatch => authService.signIn(username, password)
    .then(success => {
      dispatch({ type: actionTypes.LOG_IN, auth: success.data });
      onSuccess(success);
    })
    .catch(error => {
      console.error(`Failed to log out successfully: ${error}`);
      if (onError)
        onError(error);
    });
}

export function signOut(onSuccess: Function, onError?: Function) : ThunkAction {
  return dispatch => authService.signOut()
    .then(success => {
      dispatch({ type: actionTypes.LOG_OUT });
      onSuccess(success);
    })
    .catch(error => {
      console.error(`Failed to log out successfully: ${error}`);
      if (onError)
        onError(error);
    });
}
