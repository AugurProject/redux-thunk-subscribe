# Redux Thunk Subscribe

[![Build Status](https://travis-ci.org/tinybike/redux-thunk-subscribe.svg)](https://travis-ci.org/tinybike/redux-thunk-subscribe) [![Coverage Status](https://coveralls.io/repos/tinybike/redux-thunk-subscribe/badge.svg?branch=master&service=github)](https://coveralls.io/github/tinybike/redux-thunk-subscribe?branch=master) [![npm version](https://badge.fury.io/js/redux-thunk-subscribe.svg)](https://badge.fury.io/js/redux-thunk-subscribe)

Similar to [Redux Thunk](https://github.com/gaearon/redux-thunk), but with `subscribe` available to thunks (in addition to `dispatch` and `getState`).

Consumers of `store.subscribe` are not always known in advance, and sometimes they are intended to be set by users (for example, in library code).  Redux Thunk Subscribe adds `store.subscribe` to thunks so they are able to add listeners to the store on-the-fly.

*If you just need to dispatch asynchonous actions, you probably should be using [Redux Thunk](https://github.com/gaearon/redux-thunk) instead!*

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

## Tests

```
npm test
```
