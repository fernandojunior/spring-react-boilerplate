import React from 'react';
import { connect } from 'react-redux';
import { RouterType } from '../../propTypes';

import { signIn } from './actions';

const actionCreators = { signIn }

class SignIn extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = { authFailed: false };
  }

  signIn() {
    const username = this.usernameInput.value.trim();
    const password = this.passwordInput.value.trim();

    if (username.length === 0 || password.length === 0) {
      return;
    }

    this.props.dispatch(actionCreators.signIn(username, password,
      success => {
        const { location } = this.props;
        const nextPathname = location.state && location.state.nextPathname ? location.state.nextPathname : '/';
        this.context.router.replace(nextPathname);
      },
      error => {
        this.setState({ authFailed: true });
      }
    ));
  }

  renderAuthFailedMessage() {
    if (!this.state.authFailed) {
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
      <form onSubmit={e => this.signIn()}>
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <h1>Sign In</h1>
          </div>
        </div>
        { this.renderAuthFailedMessage() }
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

SignIn.contextTypes = {
  router: RouterType.isRequired
};

SignIn.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  location: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

/* Inject auth state and dispatch() into props */
export default connect(mapStateToProps)(SignIn);
