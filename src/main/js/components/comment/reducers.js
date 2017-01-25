/* @flow */
import type { Action, Comment } from '../../types';

import { ACTION_TYPES } from './actions';

type CommentListState = {
  status: 'stale' | 'loaded',
  data: Comment[]
}

function commentReducer(state : CommentListState = { status: 'stale', data: [] }, action : Action) : CommentListState {
  switch (action.type) {
    case ACTION_TYPES.ADD_COMMENT:
      return {
        status: state.status,
        data: state.data.concat(action.comment)
      };

    case ACTION_TYPES.COMMENTS_REFRESHED:
      return {
        status: 'loaded',
        data: action.comments
      };

    default:
      return state;
  }
}

export default commentReducer;
