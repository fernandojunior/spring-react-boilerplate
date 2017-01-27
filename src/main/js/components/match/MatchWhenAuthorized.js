/* @flow */
import React, { PropTypes } from 'react';
import { Match, Redirect } from 'react-router';
import { connect } from 'react-redux';

const RedirectToSignIn = props => (
  <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
);

const MatchWhenAuthorized = ({ component: Component, signedIn, ...rest }) => {
  const onComponentRender = props => (
    signedIn ? <Component {...props} /> : <RedirectToSignIn { ...props } />
  );

  return <Match {...rest} render={onComponentRender} />;
};

function mapStateToProps(state) {
  return { signedIn: state.auth.signedIn };
}

/* Inject auth state and dispatch() into props */
export default connect(mapStateToProps)(MatchWhenAuthorized);
