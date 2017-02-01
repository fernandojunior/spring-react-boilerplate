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
      <Match exactly pattern="/" component={CommentList} />
      <MatchWhenAuthorized pattern="/add" component={AddComment} />
      <Match pattern="/signin" component={SignIn} />
      <Miss component={Errors} />
    </div>
  </div>
);

export default App;
