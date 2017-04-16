# Redux Thunk Subscribe

[![Build Status](https://travis-ci.org/tinybike/redux-thunk-subscribe.svg)](https://travis-ci.org/tinybike/redux-thunk-subscribe) [![Coverage Status](https://coveralls.io/repos/tinybike/redux-thunk-subscribe/badge.svg?branch=master&service=github)](https://coveralls.io/github/tinybike/redux-thunk-subscribe?branch=master) [![npm version](https://badge.fury.io/js/redux-thunk-subscribe.svg)](https://badge.fury.io/js/redux-thunk-subscribe)

Similar to [Redux Thunk](https://github.com/gaearon/redux-thunk), but with `subscribe` available to thunks (in addition to `dispatch` and `getState`) so they can add listeners to the store on-the-fly.

*Important note: if you just need asynchonous actions, you probably should be using [Redux Thunk](https://github.com/gaearon/redux-thunk) instead!*

## Usage

```
npm install --save redux-thunk-subscribe
```

```javascript
var createStore = require("redux").createStore;
var thunkSubscribeEnhancer = require("redux-thunk-subscribe");

var store = createStore(reducer, thunkSubscribeEnhancer);

var thunkExclamationPoint = function () {
  return function (dispatch, getState, subscribe) {
    console.log("thunk!");
  };
};

store.dispatch(thunkExclamationPoint());
```

## Motivation

Why make `store.subscribe` available to action creators (thunks)?

[Redux](https://github.com/reactjs/redux) is normally used to build UIs, which are "complete" applications in the sense that no code is expected to be supplied by the application's users.  In a UI, the consumer of `store.subscribe` can simply be hard-coded (usually to [React](https://github.com/facebook/react)).  Library code is different.  Often, libraries expect users to supply certain pieces of code; a common example is an event handler where the user specifies a callback function.  I like the Redux philosophy a lot, and in my opinion it is a good fit for library code.  However, in library code, consumers of `store.subscribe` are not always known in advance, and, in some cases, they are intended to be defined by the library's users.  This creates a problem: *where does the library save the callbacks?*

One option is to put the user-created callbacks in the Redux store, along with the other data.  However, since the callbacks are not serializable, this [breaks some nice features of Redux](http://redux.js.org/docs/faq/OrganizingState.html#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state).  Putting callbacks in the store also just *feels* wrong: the callbacks themselves are not really *state* per se, but rather *observers* of the state.

I think a better solution is to make `store.subscribe` available to action creators, so that they can set up store listeners (i.e., user-supplied callbacks) on-the-fly.  That's what this library does.  Since `subscribe` is [not included in Redux's middleware API](https://github.com/reactjs/redux/issues/922), this library is a [store enhancer](https://github.com/reactjs/redux/blob/master/docs/Glossary.md#store-enhancer) that changes the thunk signature from `(dispatch, getState)` to `(dispatch, getState, subscribe)`.

## Tests

```
npm test
```
