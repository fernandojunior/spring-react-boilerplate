/* @flow */
import axios from 'axios';

import type { Action, Comment, ThunkAction } from '../../types';

export const ACTION_TYPES = {
  ADD_COMMENT: 'ADD_COMMENT',
  COMMENTS_REFRESHED: 'COMMENTS_REFRESHED'
}

export function addComment(comment : Comment) : Action {
  return {
    type: ACTION_TYPES.ADD_COMMENT,
    comment
  };
}

export function commentsRefreshed(comments : Comment[]) : Action {
  return {
    type: ACTION_TYPES.COMMENTS_REFRESHED,
    comments
  };
}

export function saveComment(author : string, content : string) : ThunkAction {
  return dispatch => {
    axios.post('/api/comments', { author, content })
      .then(
        success => dispatch(addComment(success.data)),
        failure => console.error(failure)
      );
  };
}

export function refreshComments() : ThunkAction {
  return dispatch => {
    axios.get('/api/comments')
      .then(
        success => dispatch(commentsRefreshed(success.data)),
        failure => console.log(failure)
      );
  };
}

