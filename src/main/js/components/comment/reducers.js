/* @flow */
import { ADD_COMMENT, COMMENTS_REFRESHED } from './actions';

import type { Action, Comment, Role } from '../../types';

type CommentsState = {
  status: 'stale' | 'loaded',
  data: Comment[]
}

function commentReducer(state : CommentsState = { status: 'stale', data: [] }, action : Action) : CommentsState {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        status: state.status,
        data: state.data.concat(action.comment)
      };

    case COMMENTS_REFRESHED:
      return {
        status: 'loaded',
        data: action.comments
      };

    default:
      return state;
  }
}

export default commentReducer;
