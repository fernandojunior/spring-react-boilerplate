/* @flow */
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { routerContext as RouterType } from 'react-router/PropTypes';

import type { Dispatch, Router } from '../../types';

import Comment from './Comment';
import './CommentList.less';
import { deleteComment, refreshComments } from './actions';

class CommentList extends React.Component {
  context: { router: Router };
  props: {
    comments: Array<{ id: number, content: string, author: string }>,
    dispatch: Dispatch
  };

  componentDidMount() {
    this.handleRefreshComments();
  }

  handleRefreshComments() {
    this.props.dispatch(refreshComments());
  }

  handleDeleteComment(id) {
    this.props.dispatch(deleteComment(id, success => {
      this.componentDidMount();
    }));
  }

  renderComment({ content, author, id }) {
    return (
      <div>
        <Comment author={author} content={content} key={id} />
        <button className="btn btn-default" onClick={e => this.handleDeleteComment(id)}>Remove</button>
      </div>
    );
  }

  render() {
    return (
      <div className="comments">
        <h1>Messages</h1>
        <div>
          <Link to="/add" className="btn btn-primary">Add Comment</Link>
          {' '}
          <button className="btn btn-default" onClick={() => this.handleRefreshComments()}>Refresh</button>
        </div>
        { (!this.props.comments || this.props.comments.length === 0)
            ? <p>No comments yet! You could add one&hellip;?</p>
            : this.props.comments.map(this.renderComment.bind(this)) }
      </div>
    );
  }
}

CommentList.contextTypes = {
  router: RouterType.isRequired
};

function mapStateToProps(state) {
  return {
    comments: state.comments.data
  };
}

/* Inject the comments and dispatch() into props */
export default connect(mapStateToProps)(CommentList);
