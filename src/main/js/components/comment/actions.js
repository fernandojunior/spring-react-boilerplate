/* @flow */
import type { Action, Comment, ThunkAction } from '../../types';

import { commentsService } from '../../services';

export const actionTypes = {
  ADD_COMMENT: 'ADD_COMMENT',
  COMMENTS_REFRESHED: 'COMMENTS_REFRESHED'
}

export function saveComment(author : string, content : string) : ThunkAction {
  return dispatch => commentsService.save(
    { author, content },
    success => dispatch({
      type: actionTypes.ADD_COMMENT,
      comment: success.data
    })
  );
}

export function refreshComments() : ThunkAction {
  return dispatch => commentsService.findAll(
    success => dispatch({
      type: actionTypes.COMMENTS_REFRESHED,
      comments: success.data
    })
  );
}
