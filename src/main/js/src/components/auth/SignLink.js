import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RouterType } from '../../propTypes';

import { signOut } from './actions';

class SignLink extends React.Component {

  handleSignOut() {
    this.props.dispatch(signOut(success => {
        this.context.router.replace('/');
    }));
  }

  render() {
    if (!this.props.auth.signedIn)
      return (<Link to="/signin">Sign In</Link>);

    return (<a onClick={() => this.handleSignOut()}>Sign Out</a>);
  }

}

SignLink.contextTypes = {
  router: RouterType.isRequired
};

SignLink.propTypes = {
 auth: React.PropTypes.object.isRequired,
 dispatch: React.PropTypes.func.isRequired
}

/* Inject auth state and a dispatch() wrapper into props */
export default connect(state => ({ auth: state.auth }))(SignLink);
