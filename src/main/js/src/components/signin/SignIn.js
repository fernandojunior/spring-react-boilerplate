/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { routerContext as RouterType } from '../../propTypes';

import { signIn } from '../auth/actions';

class SignIn extends React.Component {
  state: { authFailed: boolean };

  usernameInput : HTMLInputElement;
  passwordInput: HTMLInputElement;

  constructor(props) {
    super(props);
    this.state = { authFailed: false };
  }

  handleOnSignIn(event) {
    event.preventDefault();

    const username = this.usernameInput.value.trim();
    const password = this.passwordInput.value.trim();

    if (username.length === 0 || password.length === 0) {
      return;
    }

    this.props.dispatch(signIn(username, password,
      success => {
        const { location } = this.props;
        const nextPathname = location.state && location.state.nextPathname ? location.state.nextPathname : '/';
        this.context.router.transitionTo(nextPathname);
      },
      error => {
        this.setState({ authFailed: true });
      }
    ));
  }

  renderAuthFailedMessage(authFailed) {
    if (!authFailed) {
      return null;
    }

    return (
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-sm-offset-3 alert alert-danger" role="alert">
          Authentication failed!
        </div>
      </div>
    );
  }

  render() {
    return (
      <form onSubmit={e => this.handleOnSignIn(e)}>
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <h1>Sign In</h1>
          </div>
        </div>
        {this.renderAuthFailedMessage(this.state.authFailed)}
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 form-group">
            <label htmlFor="userInput">Username</label>
            <input id="userInput" className="form-control" ref={el => { this.usernameInput = el; }} />
          </div>
          <div className="col-sm-6 col-sm-offset-3 form-group">
            <label htmlFor="passInput">Password</label>
            <input id="passInput" className="form-control" ref={el => { this.passwordInput = el; }} type="password" />
          </div>
          <div className="col-sm-6 col-sm-offset-3 form-group">
            <button type="submit" className="btn btn-primary">Sign In</button>
          </div>
        </div>
      </form>
    );
  }
}

SignIn.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  location: React.PropTypes.object.isRequired
}

SignIn.contextTypes = {
  router: RouterType.isRequired
};

function mapStateToProps(state) {
  return { auth: state.auth };
}

/* Inject auth state and dispatch() into props */
export default connect(mapStateToProps)(SignIn);
