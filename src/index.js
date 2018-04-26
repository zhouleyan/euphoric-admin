import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/fn/array/includes';
import 'core-js/fn/array/find';
import 'core-js/fn/weak-map';
import 'raf/polyfill';
import 'url-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import reducers from './reducers';
import rootSagas from './sagas';

import './common/less/index.less';

import App from './App';
// import registerServiceWorker from './registerServiceWorker';

const history = createHistory();
const routerReduxMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(routerReduxMiddleware),
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(rootSagas);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();
