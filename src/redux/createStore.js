/* eslint import/no-extraneous-dependencies: 0, global-require: 0 */
import { createStore as _createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
function createStoreWithReducer(history, data, reducer) {
  const reduxRouterMiddleware = routerMiddleware(history);
  const middleware = [
    reduxRouterMiddleware,
  ];
  const finalCreateStore = applyMiddleware(...middleware)(_createStore);
  const store = finalCreateStore(reducer, data);
  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers'));
    });
  }
  return store;
}
function createStore(history, data) {
  return createStoreWithReducer(history, data, require('../reducers'));
}
module.exports = {
  createStore,
};
