/* @flow */
import type { ThunkAction } from '../../types';

import { commentsService } from '../../services';

export const actionTypes = {
  SAVE_COMMENT: 'SAVE_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
  FIND_ALL_COMMENTS: 'FIND_ALL_COMMENTS'
}

export function saveComment(author : string, content : string) : ThunkAction {
  return dispatch => commentsService.save({ author, content }, success => {
    dispatch({ type: actionTypes.SAVE_COMMENT, comment: success.data })
  });
}

export function deleteComment(id : number, onSuccess: Function) : ThunkAction {
  return dispatch => commentsService.delete(id, success => {
    dispatch({ type: actionTypes.DELETE_COMMENT });
    onSuccess(success);
  });
}

export function refreshComments() : ThunkAction {
  return dispatch => commentsService.findAll(success => {
    dispatch({ type: actionTypes.FIND_ALL_COMMENTS, comments: success.data });
  });
}
