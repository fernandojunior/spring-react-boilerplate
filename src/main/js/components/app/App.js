/* @flow */
import React from 'react';
import { Match, Miss } from 'react-router';

import { Errors } from '../errors';
import { MatchWhenAuthorized } from '../match';
import { SignIn } from '../signin';
import { Navigation } from '../navigation';
import { CommentList, AddComment } from '../comment';

const App = () => (
  <div>
    <Navigation />

    <div className="container">
      <Match exactly location="hash" pattern="/" component={CommentList} />
      <MatchWhenAuthorized pattern="/add" location="hash" component={AddComment} />
      <Match pattern="/signin" location="hash" component={SignIn} />
      <Miss component={Errors} />
    </div>
  </div>
);

export default App;
