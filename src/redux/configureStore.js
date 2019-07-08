import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import authSaga from './auth/saga/index';

export const history = createBrowserHistory();


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(preloadedState) {
  const middlewares = [
    routerMiddleware(history), // for dispatching history actions
    sagaMiddleware,
  ];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(authSaga);

  return store;
}
