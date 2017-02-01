/* @flow */
import type { Action, Comment } from '../../types';

import { actionTypes } from './actions';

type CommentListState = {
  status: 'stale' | 'loaded',
  data: Comment[]
}

function commentReducer(state : CommentListState = { status: 'stale', data: [] }, action : Action) : CommentListState {
  switch (action.type) {
    case actionTypes.ADD_COMMENT:
      return {
        status: state.status,
        data: state.data.concat(action.comment)
      };

    case actionTypes.DELETE_COMMENT:
      return {
        status: 'stale',
        data: []
      };

    case actionTypes.COMMENTS_REFRESHED:
      return {
        status: 'loaded',
        data: action.comments
      };

    default:
      return state;
  }
}

export default commentReducer;
