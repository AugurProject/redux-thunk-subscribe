"use strict";

var test = require("tape");
var redux = require("redux");
var thunkSubscribeEnhancer = require("../src");

test("redux-thunk-subscribe", function (t) {
  var enhancedCreateStore, store;
  t.assert(typeof thunkSubscribeEnhancer === "function", "thunkSubscribeEnhancer should be a function");
  t.assert(typeof thunkSubscribeEnhancer.withExtraArgument === "function", "thunkSubscribeEnhancer.withExtraArgument should be a function");
  enhancedCreateStore = thunkSubscribeEnhancer(redux.createStore);
  t.assert(typeof enhancedCreateStore === "function", "thunkSubscribeEnhancer(createStore) should be a function");
  store = enhancedCreateStore(function (state) { return state; }, {});
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
      t.deepEqual(dispatch({ type: "HAPPY_DAYS_ARE_HERE_AGAIN" }), { type: "HAPPY_DAYS_ARE_HERE_AGAIN" }, "happy days should be here again");
      t.end();
    };
  }
  store.dispatch(cueAction());
});
