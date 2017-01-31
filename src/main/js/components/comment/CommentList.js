/* @flow */
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import type { Dispatch } from '../../types';

import Comment from './Comment';
import './CommentList.less';
import { refreshComments } from './actions';

class CommentList extends React.Component {
  props: {
    status: string,
    comments: Array<{ id: number, content: string, author: string }>,
    dispatch: Dispatch
  };

  componentDidMount() {
    if (this.props.status === 'stale') {
      this.handleRefreshComments();
    }
  }

  handleRefreshComments() {
    this.props.dispatch(refreshComments());
  }

  renderComment({content, author, id}) {
    return (<Comment author={author} content={content} key={id} />);
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
        { this.props.comments.length === 0
            ? <p>No comments yet! You could add one&hellip;?</p>
            : this.props.comments.map(this.renderComment) }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.comments.status,
    comments: state.comments.data
  };
}

/* Inject the comments and dispatch() into props */
export default connect(mapStateToProps)(CommentList);
