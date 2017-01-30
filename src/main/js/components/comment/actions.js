/* @flow */
import type { Action, Comment, ThunkAction } from '../../types';

import { commentsService } from '../../services';

export const actionTypes = {
  ADD_COMMENT: 'ADD_COMMENT',
  COMMENTS_REFRESHED: 'COMMENTS_REFRESHED'
}

export function addComment(comment : Comment) : Action {
  return {
    type: actionTypes.ADD_COMMENT,
    comment
  };
}

export function commentsRefreshed(comments : Comment[]) : Action {
  return {
    type: actionTypes.COMMENTS_REFRESHED,
    comments
  };
}

export function saveComment(author : string, content : string) : ThunkAction {
  return dispatch => commentsService.create(
    { author, content }, success => dispatch(addComment(success.data))
  );
}

export function refreshComments() : ThunkAction {
  return dispatch => commentsService.findAll(
    success => dispatch(commentsRefreshed(success.data))
  );
}
