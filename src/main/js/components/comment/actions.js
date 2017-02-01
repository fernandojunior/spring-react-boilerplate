/* @flow */
import type { Comment, ThunkAction } from '../../types';

import { commentsService } from '../../services';

export const actionTypes = {
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
  FIND_ALL_COMMENTS: 'FIND_ALL_COMMENTS'
}

export function saveComment(author : string, content : string) : ThunkAction {
  return dispatch => commentsService.save({ author, content }, success => {
    dispatch({ type: actionTypes.ADD_COMMENT, comment: success.data })
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
