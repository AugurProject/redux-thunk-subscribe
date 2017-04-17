"use strict";

var createThunkSubscribeEnhancer = function (extraArgument) {
  return function (createStore) {
    return function (reducer, initialState) {
      var store = createStore(reducer, initialState);
      var dispatch = store.dispatch;
      store.dispatch = function (action) {
        if (typeof action === "function") {
          return action(store.dispatch, store.getState, store.subscribe, extraArgument);
        }
        return dispatch(action);
      };
      return store;
    };
  };
};

var thunkSubscribeEnhancer = createThunkSubscribeEnhancer();
thunkSubscribeEnhancer.withExtraArgument = createThunkSubscribeEnhancer;

module.exports = thunkSubscribeEnhancer;
