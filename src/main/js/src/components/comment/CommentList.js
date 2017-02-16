import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RouterType } from '../../propTypes';

import Comment from './Comment';
import { deleteComment, refreshComments } from './actions';
import './CommentList.less';

class CommentList extends React.Component {

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

CommentList.propTypes = {
  comments: React.PropTypes.arrayOf(React.PropTypes.object),
  dispatch: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    comments: state.comments.data
  };
}

/* Inject the comments and dispatch() into props */
export default connect(mapStateToProps)(CommentList);
