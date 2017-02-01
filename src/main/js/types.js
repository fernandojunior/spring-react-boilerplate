/* @flow */
/* eslint no-use-before-define:"off" */
/* Inspired by https://github.com/fbsamples/f8app/blob/master/js/actions/types.js */
// TODO decouple module

const Action = Object

export type Auth = {
  roles: String[],
  signedIn: boolean
};

export type Role =
    'ROLE_ADMIN'
  | 'ROLE_USER'
  | 'ROLE_ANONYMOUS';

export type Comment = { author : string, comment : string };

export type Dispatch = (action: Object | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;

export type Store = {
  getState: () => Object
};

export type Router = {
  transitionTo: Function,
  replaceWith: Function,
  blockTransitions: Function,
  createHref: Function
};
