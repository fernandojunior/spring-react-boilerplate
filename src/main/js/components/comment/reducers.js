/* @flow */
import type { Action, Comment } from '../../types';

import { actionTypes } from './actions';

type CommentsState = {
  data: Comment[]
}

function commentsReducer(state : CommentsState = { data: [] }, action : Action) : CommentsState {
  switch (action.type) {
    case actionTypes.ADD_COMMENT:
      return {
        data: state.data.concat(action.comment)
      };

    case actionTypes.DELETE_COMMENT:
      return state;

    case actionTypes.FIND_ALL_COMMENTS:
      return {
        data: action.comments
      };

    default:
      return state;
  }
}

export default commentsReducer;
