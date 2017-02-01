/* @flow */
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { routerContext as RouterType } from 'react-router/PropTypes';

import type { Auth, Router } from '../../types';

import { signOut } from './actions';

class SignLink extends React.Component {
  context: { router: Router };
  props: { auth: Auth, dispatch: Function };

  handleSignOut() {
    this.props.dispatch(signOut(success => {
        this.context.router.transitionTo('/');
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

/* Inject auth state and a dispatch() wrapper into props */
export default connect(state => ({ auth: state.auth }))(SignLink);
