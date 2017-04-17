"use strict";

var test = require("tape");
var createStore = require("redux").createStore;
var thunkSubscribeEnhancer = require("../src");

var reducer = function (state) { return state; };
var happyDaysAreHereAgain = { type: "HAPPY_DAYS_ARE_HERE_AGAIN" };

test("redux-thunk-subscribe", function (t) {
  var enhancedCreateStore, store;
  t.assert(typeof thunkSubscribeEnhancer === "function", "thunkSubscribeEnhancer should be a function");
  t.assert(typeof thunkSubscribeEnhancer.withExtraArgument === "function", "thunkSubscribeEnhancer.withExtraArgument should be a function");
  enhancedCreateStore = thunkSubscribeEnhancer(createStore);
  t.assert(typeof enhancedCreateStore === "function", "thunkSubscribeEnhancer(createStore) should be a function");
  store = enhancedCreateStore(reducer, {});
  t.assert(typeof store.getState === "function", "store.getState should be a function");
  t.assert(typeof store.dispatch === "function", "store.dispatch should be a function");
  t.assert(typeof store.subscribe === "function", "store.subscribe should be a function");
  t.assert(typeof store.replaceReducer === "function", "store.replaceReducer should be a function");
  function cueAction() {
    return function (dispatch, getState, subscribe) {
      t.assert(typeof dispatch === "function", "dispatch should be a function inside a thunk");
      t.assert(typeof getState === "function", "getState should be a function inside a thunk");
      t.assert(typeof subscribe === "function", "subscribe should be a function inside a thunk");
      t.strictEqual(dispatch, store.dispatch, "dispatch should be identical to store.dispatch");
      t.strictEqual(getState, store.getState, "getState should be identical to store.getState");
      t.strictEqual(subscribe, store.subscribe, "subscribe should be identical to store.subscribe");
      t.strictEqual(dispatch(happyDaysAreHereAgain), happyDaysAreHereAgain, "happy days should be here again");
    };
  }
  store.dispatch(cueAction());
  t.end();
});

test("with extra argument", function (t) {
  var extraArgument = { isArgumentative: true };
  var store = thunkSubscribeEnhancer.withExtraArgument(extraArgument)(createStore)(reducer, {});
  function cueAction() {
    return function (dispatch, getState, subscribe, extras) {
      t.assert(typeof dispatch === "function", "dispatch should be a function inside a thunk");
      t.assert(typeof getState === "function", "getState should be a function inside a thunk");
      t.assert(typeof subscribe === "function", "subscribe should be a function inside a thunk");
      t.strictEqual(extras, extraArgument, "extra argument should be available inside the thunk");
      t.strictEqual(dispatch, store.dispatch, "dispatch should be identical to store.dispatch");
      t.strictEqual(getState, store.getState, "getState should be identical to store.getState");
      t.strictEqual(subscribe, store.subscribe, "subscribe should be identical to store.subscribe");
      t.strictEqual(dispatch(happyDaysAreHereAgain), happyDaysAreHereAgain, "happy days should be here again");
    };
  }
  store.dispatch(cueAction());
  t.end();
});
