/* @flow */
import type { Comment } from '../../types';

import { actionTypes } from './actions';

type CommentsState = {
  data: Comment[]
}

function commentsReducer(state : CommentsState = { data: [] }, action : Object) : CommentsState {
  switch (action.type) {
    case actionTypes.SAVE_COMMENT:
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
